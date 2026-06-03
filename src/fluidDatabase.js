// HoundMoto Fluid Database - Oil and Transmission Specs
export const fluidDatabase = {
  '2020 Ford F-150': { '3.3L': { oil: '5W-20, 5.0 qt', trans: 'Motorcraft MERCON ULV, 14.0 qt' }, '5.0L': { oil: '5W-20, 6.0 qt', trans: 'Motorcraft MERCON ULV, 14.0 qt' } },
    '2020 Chevrolet Silverado': { '5.3L': { oil: '5W-30, 6.0 qt', trans: 'Dexron VI, 11.5 qt' }, '6.2L': { oil: '5W-30, 7.5 qt', trans: 'Dexron VI, 11.5 qt' } },
      '2022 Toyota Camry': { '2.5L': { oil: '0W-20, 4.6 qt', trans: 'Toyota WS, 8.4 qt' }, '3.5L': { oil: '0W-20, 5.1 qt', trans: 'Toyota WS, 8.9 qt' } },
        '2020 Honda Civic': { '1.6L': { oil: '0W-20, 3.7 qt', trans: 'Honda CVT, 5.4-7.4 qt' }, '2.0L': { oil: '0W-20, 3.7 qt', trans: 'Honda CVT, 5.4-7.4 qt' } },
          '2020 Nissan Altima': { '2.5L': { oil: '0W-20, 4.2 qt', trans: 'Nissan CVT NS-3, 5.8 qt' } },
            '2020 BMW 3 Series': { '2.0L Turbo': { oil: '5W-30 BMW LL-01, 5.2 qt', trans: 'BMW EZL, 8.5 qt' } },
              '2020 Hyundai Elantra': { '2.0L': { oil: '5W-20, 3.8 qt', trans: 'Hyundai SP-IV, 4.8-6.3 qt' } },
                '2020 Jeep Wrangler': { '3.6L': { oil: '5W-20, 6.0 qt', trans: 'Mopar ATF+4, 9.0 qt' } },
                  '2020 Subaru Outback': { '2.5L': { oil: '0W-20, 4.3 qt', trans: 'Subaru CVT, 4.8-5.4 qt' } },
                    '2006 Nissan Altima': { '2.4L': { oil: '5W-30, 4.0 qt', trans: 'Toyota ATF IV, 7.0 qt' } },
                    };

                    export function getFluidSpecs(query) {
                      const lower = query.toLowerCase().trim();
                        for (const [vehicle, engines] of Object.entries(fluidDatabase)) {
                            if (lower.includes(vehicle.toLowerCase())) {
                                  const engineList = Object.entries(engines).map(([eng, specs]) => `${eng}: ${specs.oil} | ${specs.trans}`).join(' | ');
                                        return { vehicle, specs: engineList };
                                            }
                                              }
                                                return null;
                                                }
