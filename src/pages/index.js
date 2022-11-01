/* eslint-disable prettier/prettier */
import React from 'react';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';
import LoadingGrid from '../components/LoadingGrid';
import ItemsGrid from '../components/ItemGrid';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">the slicers on duty</span>
      </h2>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {slicemasters?.length && <ItemsGrid items={slicemasters} />}
    </div>
  );
}

function CurrentSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt"> Hot Slices</span>
      </h2>
      {!hotSlices && <LoadingGrid count={5} />}
      {hotSlices && !hotSlices?.length && (<p>Nothing in the case</p>)}
      {hotSlices?.length && <ItemsGrid items={hotSlices} />}
    </div>
  );
}

export default function Homepage() {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div>
      homepage
      <h1>The Best Pizza Dowotown</h1>
      <p>open from 11 to 11PM every single day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <CurrentSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
}
