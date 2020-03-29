import React, {useState, useEffect} from 'react';
import Combo from './Combo';
import Button from './Button';
import locations from '../import/locations.json';
import {charities} from '../import/charities.json';
import config from '../config.json';

export default function GetStartedForm() {

  const [countyId, setCountyId] = useState(0);
  const [charityId, setCharityId] = useState(0);

  // Append "Coming soon!" to the counties which aren't currently
  // serviced by any charity and mark them as "disabled" so they
  // are greyed out and can't be selected.
  const counties = locations.counties.map( county => {
    let numCharitiesForCounty = charities.reduce( function(count, charity) {
      return count + ( charity.countyIds.includes(county.id) ? 1 : 0 );
    }, 0)

    if (numCharitiesForCounty > 0) {
      return county;
    } else {
      return {
        ...county,
        name: county.name + " (coming soon!)",
        disabled: true
      };
    }
  });

  // Clear out the 'Charity' combo if 'County' is changed
  useEffect( () => {
    setCharityId(0);
  }, [countyId]);

  // Redirect the user to Subbly
  function handleSubmit() {
    window.location.href = config.subscriptionBoxUrl;
  }

  return (
    <>
      <div className="flex mb-12">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="relative">
            <Combo
              name="countyId"
              value={countyId}
              setValue={setCountyId}
              items={counties}
              placeholder="select"
              // style={{ background: '#c7c7c7'}}
              theme=""
              label="County"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <div className="relative">
            <Combo
              name="charityId"
              value={charityId}
              setValue={setCharityId}
              items={charities.filter(c => c.countyIds.includes(countyId))}
              disabled={!countyId || (counties.find(c => c.id === countyId).disabled)}
              placeholder="select"
              theme=""
              label="Charity"
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            />
          </div>
        </div>
      </div>
      <div>

      <Button onClick={handleSubmit} disabled={charityId === 0}>Get Started</Button>
      </div>
    </>
  );

}
