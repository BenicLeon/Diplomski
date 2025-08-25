import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Helpers/Sidebar';
import '../../css/home.css';

import {
  FaRulerCombined,
  FaRulerHorizontal,
  FaRulerVertical,
  FaAngleDoubleRight,
  FaVectorSquare,
  FaDotCircle,
  FaCircleNotch,
  FaBezierCurve,
  FaDraftingCompass
} from 'react-icons/fa';

const Home = () => {
  const sections = [
    {
      title: "Udaljenosti",
      items: [
        {
          to: "/plane-distance",
          text: "Udaljenost između ravnina",
          icon: <FaRulerCombined />,
        },
        {
          to: "/plane-point-distance",
          text: "Udaljenost točke i ravnine",
          icon: <FaRulerHorizontal />,
        },
        {
          to: "/point-distance",
          text: "Udaljenost dviju točaka",
          icon: <FaRulerVertical />,
        },
      ],
    },
    {
      title: "Kutovi",
      items: [
        {
          to: "/plane-angle",
          text: "Kut između ravnina",
          icon: <FaAngleDoubleRight />,
        },
        {
          to: "/angle-between-plane-line",
          text: "Kut između ravnine i pravca",
          icon: <FaVectorSquare />,
        },
      ],
    },
    {
      title: "Pripadnosti",
      items: [
        {
          to: "/point-checker",
          text: "Pripadnost točke ravnini",
          icon: <FaDotCircle />,
        },
        {
          to: "/origin-checker",
          text: "Prolazi li ravnina kroz ishodište?",
          icon: <FaCircleNotch />,
        },
      ],
    },
    {
      title: "Jednadžbe",
      items: [
        {
          to: "/line-from-points",
          text: "Pravac kroz dvije točke",
          icon: <FaBezierCurve />,
        },
        {
          to: "/plane-from-points",
          text: "Ravnina kroz tri točke",
          icon: <FaDraftingCompass />,
        },
      ],
    },
  ];

  return (
    <div className="home-container">
      <Sidebar />
      <main className="main-content" style={{ marginLeft: '300px' }}>
        {sections.map((section, index) => (
          <div key={index}>
            <h3 style={{ marginBottom: '10px', marginTop: index > 0 ? '40px' : '0' }}>{section.title}</h3>
            <div className="link-grid">
              {section.items.map((item, i) => (
                <Link key={i} to={item.to} className="link-card">
                  <div className="link-card-icon">{item.icon}</div>
                  <div className="link-card-text">{item.text}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
