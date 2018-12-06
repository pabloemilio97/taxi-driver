const Currency = require('currency.js');
const {
  getTaxes,
  FACTOR_PRECISION
} = require('../../lib');

describe('Mexico', () => {
  describe('IVA', () => {
    test('Normal', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 },
          }
        }
      });
    });

    test('Exampt (Pharmacy Drug)', () => {
      const q = {
        country: "MX",
        txType: "sales",
        docType: "invoice",
        category: 'DRUG',
        area: 'PHARMACY',
        taxes: ["IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IVA': {
            rate: { error: null, result: 0 },
            factor: { error: null, result: 0 },
            meta: { exempt: true },
          }
        }
      });
    });
  });

  describe('RET', () => {
    test('RET_IVA', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_IVA"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'RET_IVA': {
            rate: { error: null, result: -0.167 },
            factor: { error: null, result: -0.167 },
          }
        }
      });
    });

    test('RET_ISR', () => {
      const q = {
        country: "MX",
        txType: "income",
        docType: "invoice",
        taxes: ["RET_ISR"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'RET_ISR': {
            rate: { error: null, result: -0.1 },
            factor: { error: null, result: -0.1 },
          }
        }
      });
    });
  });

  describe('PAYROLL', () => {
    test('N.L.', () => {
      const q = {
        country: "MX",
        local: true,
        region: 'NL',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'PAYROLL': {
            rate: { error: null, result: 0.02 },
            factor: { error: null, result: 0.02 },
          }
        }
      });
    });

    test('D.F.', () => {
      const q = {
        country: "MX",
        local: true,
        region: 'DF',
        txType: "income",
        category: 'NOMINA',
        taxes: ["PAYROLL"],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'PAYROLL': {
            rate: { error: null, result: 0.03 },
            factor: { error: null, result: 0.03 },
          }
        }
      });
    });
  });

  describe('Multi Taxes', () => {
    test('With dependant whitholding (RET_IVA)', () => {
      const q = {
        country: "MX",
        local: true,
        region: 'AGS',
        docType: 'ARI',
        txType: "sales",
        bpType: "signed",
        area: 'PHARMACY',
        category: 'DRUG',
        vars: {
          subTotal: 1000
        },
        taxes: [ 'IVA', 'ISR', 'RET_IVA' ],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 1000,
        taxTotal: 153.33,
        grandTotal: 1153.33,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 },
            amount: { error: null, result: 160 },
          },
          'ISR': {
            rate: { error: null, result: 0.10 },
            factor: { error: null, result: 0.10 },
            amount: { error: null, result: 100 },
          },
          'RET_IVA': {
            rate: {
              error: null,
              result: -2/3
            },
            factor: {
              error: null,
              result: Currency(-0.16*(2/3), { precision: FACTOR_PRECISION }).value
            },
            amount: { error: null, result: -106.67 },
          }
        }
      });
    });

    
    https://www.elcontribuyente.mx/calculadora/honorarios/
    test('With 2 whitholding (Honorarios)', () => {
      const q = {
        country: "MX",
        local: true,
        region: 'AGS',
        docType: 'ARI',
        txType: "sales",
        bpType: "signed",
        area: 'PHARMACY',
        category: 'DRUG',
        vars: {
          subTotal: 1000
        },
        taxes: [ 'IVA', 'RET_ISR', 'RET_IVA' ],
      };

      expect(getTaxes(q)).toEqual({
        subTotal: 1000,
        taxTotal: -46.67,
        grandTotal: 953.33,
        taxes: {
          'IVA': {
            rate: { error: null, result: 0.16 },
            factor: { error: null, result: 0.16 },
            amount: { error: null, result: 160 },
          },
          'RET_ISR': {
            rate: { error: null, result: -0.10 },
            factor: { error: null, result: -0.10 },
            amount: { error: null, result: -100 },
          },
          'RET_IVA': {
            rate: {
              error: null,
              result: -2/3
            },
            factor: {
              error: null,
              result: Currency(-0.16*(2/3), { precision: FACTOR_PRECISION }).value
            },
            amount: { error: null, result: -106.67 },
          }
        }
      });
    });
  });

  describe('IEPS', () => {
    test('Candy > 100g', () => {
      const q = {
        country: 'MX',
        local: false,
        txType: 'sales',
        category: 'CANDY',
        vars: {
          grams: '101'
        },
        taxes: [ 'IEPS' ],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IEPS': {
            rate: { error: null, result: 0.08 },
            factor: { error: null, result: 0.08 },
          }
        }
      });
    });

    test('Candy <= 100g', () => {
      const q = {
        country: 'MX',
        local: false,
        txType: 'sales',
        category: 'CANDY',
        vars: {
          grams: 99
        },
        taxes: [ 'IEPS' ],
      };

      expect(getTaxes(q)).toEqual({
        taxes: {
          'IEPS': {
            rate: { error: null, result: 0.0 },
            factor: { error: null, result: 0.0 },
          }
        }
      });
    });
  });
});

