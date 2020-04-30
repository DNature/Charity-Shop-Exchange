import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Home/Hero';
import GetStartedForm from '../components/Home/GetStartedForm';
import HowItWorks from '../components/Home/HowItWorks';
import Subscribe from '../components/Home/Subscribe';
import Mission from '../components/Home/Mission';
import Register from '../components/Home/Register';
import Dialog from '../components/Dialog';
import useDialog from '../components/Dialog/useDialog';

import balloon from '../assets/img/balloon@2x.png';
import hero from '../assets/img/hero_01_girl.png';
// import boxes from "../assets/img/boxes.png";
import onefinger from '../assets/img/one-finger_200_transparent.gif';
import box from '../assets/img/4039-rocking-gift.gif';
import boxopen from '../assets/img/18033-box-open-gray-200.gif';
import boxfill from '../assets/img/3321-shipment.gif';
import boxwalk from '../assets/img/17431-package-delivery.gif';
import base from '../assets/img/base@1x.png';
import door from '../assets/img/door@1x.png';
import twitter from '../assets/img/twitter.svg';
import PlanSelection from '../components/Home/PlanSelection';
import items from '../import/planList';

export default function Home() {
  const { isShowing, toggle } = useDialog();

  let planList = [];
  React.useEffect(() => {
    for (const key in items) {
      const list = items[key];
      planList = planList.concat(list.map((elem) => elem.id));
    }
  }, []);

  return (
    <>
      <Layout>
        <Hero />
        <GetStartedForm toggle={toggle} />
        <HowItWorks />
        <Subscribe toggle={toggle} />
        <Mission />
        <Register />
      </Layout>
      <Dialog isLarge={true} isShowing={isShowing} hide={toggle}>
        <h1 className='font-header text-center text-2xl sm:text-3xl font-bold text-new-red leading-tight mb-2 sm:mb-4'>
          Select a plan
        </h1>

        <PlanSelection></PlanSelection>
        {/* <h3 className="text-center text-base sm:text-l text-gray-600 font-medium mb-6 sm:mb-6">We’ll be launching Charity Shop Exchange in the next few days. Please follow us on Twitter for updates:</h3>
        <p className="font-header text-base text-center sm:text-l font-bold text-new-red">
          <a href="https://twitter.com/CharityShopEx"><img
            className="inline pr-1 transition duration-500 ease-in-out transform hover:-translate-y-1"
            src={twitter}
            alt="twitter"
            style={{ width: 30, height: 30 }}
          />@CharityShopEx</a>
        </p> */}
      </Dialog>
      <div className='invisible'>
        {planList.map((planId) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            key={planId}
            href='#'
            data-cb-type='checkout'
            data-cb-plan-id={planId}
            // className="invisible"
            id={'plan:' + planId}
          >
            Click
          </a>
        ))}
      </div>
    </>
  );
}
