const _ = require('lodash');
const db = require('./db');
var FormulaParser = require('hot-formula-parser').Parser;
var parser = new FormulaParser();

const salesTax = (countryCode, query) => {
  const rules = db.get('taxRules')
                  .filter({ countryCode })
                  .value();

  if(_.isEmpty(rules)) {
    return { error: `Tax rules for country ${countryCode} not found` };
  }

  const rule = findRule(rules, query);

  if(!!query.vars) {
    _.forEach(query.vars, (v, k) => parser.setVariable(k, v));
  }

  console.log(parser.parse(rule.formula));
  return parser.parse(rule.formula);
}

function findRule(rules, query) {
  const columns = db.get('meta.taxRulesColumns').value();

  const result = _.reduce(columns, (res, col) => {
    return _.filter(res, (rule) => {
      if(!!rule[col]) {
        return rule[col] === query[col];
      } else {
        if(!!query[col]) {
          return false;
        } else {
          return rule[col] === query[col];
        }
      }
    });
  }, rules);

  if(_.isEmpty(result)) {
    return { error: `No tax rules found for ${JSON.stringify(query)}` };
  }

  if(result.length > 1) {
    return { error: `More than one rule found for ${JSON.stringify(query)}` };
  }

  return result[0];
}

exports.salesTax = salesTax;