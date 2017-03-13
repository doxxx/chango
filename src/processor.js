import { PDFJS } from 'pdfjs-dist'
import moment from 'moment'

import * as actions from './actions'

// Initialize PDFJS to use the worker script from mozilla.github.io
PDFJS.workerSrc = 'http://mozilla.github.io/pdf.js/build/pdf.worker.js'

// Constants
const Y_DISTANCE_FUDGE_FACTOR = 2
const RE_DATE = /([0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9]) - ([0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9])/
const DATE_FORMAT = 'DD/MM/YYYY'

function pageOrder(a, b) {
  let ax = a.transform[4], ay = a.transform[5]
  let bx = b.transform[4], by = b.transform[5]
  let yd = ay - by
  if (yd <= -Y_DISTANCE_FUDGE_FACTOR) return 1
  else if (yd >= Y_DISTANCE_FUDGE_FACTOR) return -1
  else if (ax < bx) return -1
  else if (ax > bx) return 1
  else return 0
}

function makeEntry(items) {
  let [ company, tripCount, totalTripCost ] = items
  return {
    company,
    tripCount: Number.parseInt(tripCount, 10),
    totalTripCost: Number.parseFloat(totalTripCost.substring(1))
  }
}

const states = {
  start(context, item) {
    let m = RE_DATE.exec(item)
    if (m) {
      context.week = {
        from: moment(m[1], DATE_FORMAT),
        to: moment(m[2], DATE_FORMAT),
        entries: []
      }
      return states.header
    }
    return states.start
  },
  header(context, item) {
    if (item.match(/Valeur totale PRESTO/)) {
      context.entry = []
      return states.entries
    }
    return states.header
  },
  entries(context, item) {
    if (item.match(/PRESTO Transit Usage Report/) ||
      item.match(/Total e-Purse Trips/)) {
      context.weeks.push(context.week)
      return null
    }
    else if (RE_DATE.exec(item)) {
      context.weeks.push(context.week)
      return states.start(context, item)
    }
    else {
      context.entry.push(item.trim())
      if (context.entry.length === 3) {
        context.week.entries.push(makeEntry(context.entry))
        context.entry = []
      }
    }
    return states.entries
  }
}

function sum(array) {
  return array.reduce((a,b) => a+b)
}

function processPageContent(content) {
  // order items by their position on the page, top to bottom, left to right
  let items = [...content.items]
  items = items.sort(pageOrder).map(item => item.str)

  // scan items to find the date pattern which marks the beginning of a week
  // scan further to find 'Valeur totale PRESTO' which marks end of row header
  // next three items are company name, trip count, total trip cost
  // repeat until date pattern, which marks beginning of next week

  let context = {
    weeks: []
  }
  let state = states.start
  for (let item of items) {
    state = state(context, item)
    if (!state) break
  }

  return context.weeks
}

function flatten(arrays) {
  return [].concat(...arrays)
}

function analyzeWeeks(weeks) {
  let months = []
  let month

  for (let week of weeks) {
    if (!month) {
      month = {
          from: week.from,
          weeks: 0,
          trips: 0,
          cost: 0
        }
    }

    month.weeks++
    month.trips += sum(week.entries.map(e => e.tripCount))
    month.cost += sum(week.entries.map(e => e.totalTripCost))

    if (month.weeks === 4) {
      if (month.trips >= 32) {
        months.push(month)
      }
      month = null
    }
  }

  if (month && month.weeks > 0 && month.trips >= 32) {
    months.push(month)
  }

  let totalClaimAmount = sum(months.map(m => m.cost))

  return {
    weeks,
    months,
    totalClaimAmount
  }
}

function processDoc(doc) {
  let pageResults = []

  for (let i = 1; i <= doc.numPages; i++) {
    pageResults.push(
      doc.getPage(i)
        .then(page => page.getTextContent())
        .then(processPageContent)
    )
  }

  return Promise.all(pageResults)
    .then(flatten)
    .then(analyzeWeeks)
}

function doProcessing(file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader()
    fr.onload = () => {
      PDFJS.getDocument(fr.result)
        .then(processDoc)
        .then(resolve, reject)
    }
    fr.readAsArrayBuffer(file)
  })
}

export function processFile(file) {
  return dispatch => {
    dispatch(actions.fileProcessingStarted())
    doProcessing(file).then(result => dispatch(actions.fileProcessingFinished(result)))
  }
}