import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Carousel from "react-multi-carousel";
import Translate from "../../../utils/translate/translateService";

interface InsightsCardProps {
  identifier: string,
  date: string,
  title: string,
  img: string,
  url: string,
  italicize?: string
}

export default function InsightsCard(props: InsightsCardProps) {
  return (
    <div className="flex card column insights-card">
      <div className="flex space-between pb-1">
        <div className="section-title insights-card-identifier">
          {props.identifier.toUpperCase()}
        </div>
        <div className="insights-card-date">
          {props.date}
        </div>
      </div>
      <div className="flex center-item insights-card-image">
        <img src={props.img} alt="" className="fit insights-card-image"></img>
        <a href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="overlay flex">
          <div className="insights-card-image-overlay flex fill center-item column">
            <div>{Translate('ViewFile')}</div>
            <div className="flex center-item">
              <FontAwesomeIcon
                icon={faFile}
                className={'icon'}
                color={'white'}
                size={"lg"} />

            </div>
          </div>
        </a>
      </div>
      <div className="fit insights-card-title">
        <a href={props.url} target="_blank" rel="noopener noreferrer" className="">
          {props.italicize ? <i>{props.italicize}&nbsp;</i> : null}{props.title}
        </a>
      </div>
    </div>
  )
}

const listOfMediaInsightProps: InsightsCardProps[] = [
  {
    identifier: Translate("Media"),
    date: "May 23, 2020",
    title: "Understanding the Virus and Its Unanswered Questions",
    img: "",
    url: "https://www.bloomberg.com/news/articles/2020-05-06/understanding-the-virus-and-its-unanswered-questions-quicktake",
  },
  {
    identifier: Translate("Media"),
    date: "May 24, 2020",
    title: "Knowledge hub developed to track SARS-CoV antibody studies",
    img: "",
    url: "https://www.research.ox.ac.uk/Article/2020-05-28-knowledge-hub-developed-to-track-sars-cov-antibody-studies",
  },
  {
    identifier: Translate("Media"),
    date: "May 28, 2020",
    title: "Global launch of SeroTracker: a COVID-19 antibody testing hub, in partnership with Canada's COVID-19 Immunity Task Force",
    img: "",
    url: "https://www.covid19immunitytaskforce.ca/global-launch-of-serotracker-a-covid-19-antibody-testing-hub-in-partnership-with-canadas-covid-19-immunity-task-force/",
  },
  {
    identifier: Translate("Media"),
    date: "June 2, 2020",
    title: "Students build online dashboard to track COVID-19 antibody studies",
    img: "",
    url: "https://uwaterloo.ca/stories/engineering-students/students-build-online-dashboard-track-covid-19-antibody",
  },
  {
    identifier: Translate("Media"),
    date: "June 2, 2020",
    title: "Newly launched SeroTracker will monitor global antibody testing efforts",
    img: "",
    url: "https://publications.mcgill.ca/medenews/2020/06/16/newly-launched-serotracker-will-monitor-global-antibody-testing-efforts/",
  },
  {
    identifier: Translate("Media"),
    date: "June 11, 2020",
    title: "What if there is no COVID-19 vaccine? A veteran doctor of the HIV/AIDS crisis provides alternatives",
    img: "",
    url: "https://www.marsdd.com/magazine/what-if-there-is-no-covid-19-vaccine/",
  },
  {
    identifier: Translate("Media"),
    date: "July 7, 2020",
    title: "Covid Radar: taxa de subnotificação de casos de covid-19 na Rocinha chega a 62 vezes [COVID-19 underreporting rate in Rocinha reaches 62 times].",
    img: "",
    url: "https://m1newstv.com/subnotificacao-no-brasil-e-na-rocinha-e-a-media-mundial/",
  },
  {
    identifier: Translate("Media"),
    date: "July 22, 2020",
    title: "How many of us are likely to have caught the coronavirus so far?",
    img: "",
    url: "https://www.newscientist.com/article/mg24632873-000-how-many-of-us-are-likely-to-have-caught-the-coronavirus-so-far/",
  },
  {
    identifier: Translate("Media"),
    date: "August 3, 2020",
    title: "Adjunct lecturership for CHI Lab DPhil student Rahul Arora.",
    img: "",
    url: "https://eng.ox.ac.uk/chi/news/adjunct-lecturership-for-rahul/",
  },
  {
    identifier: Translate("Media"),
    date: "August 17, 2020",
    title: "Cheap, Daily Home Tests Are The First Step To Containing The Pandemic",
    img: "",
    url: "https://www.forbes.com/sites/williamhaseltine/2020/08/17/cheap-daily-home-tests-are-the-first-step-to-containing-the-pandemic/?sh=677d47d14ad4",
  },
  {
    identifier: Translate("Media"),
    date: "November 10, 2020",
    title: "SeroTracker COVID-19 Journey: HIMSS Canadian Prairies Chapter Webinar",
    img: "",
    url: "http://www.himsschapter.org/event/serotracker-covid-19-journey-himss-canadian-prairies-chapter-webinar",
  },
  {
    identifier: Translate("Media"),
    date: "November 23, 2020",
    title: "The Serotracker: Alumni and students develop tool to track Covid-19 spread",
    img: "",
    url: "https://cumming.ucalgary.ca/news/serotracker",
  },
  {
    identifier: Translate("Media"),
    date: "November 24, 2020",
    title: "Study on the global coronavirus infection rate: the number of unreported cases",
    img: "",
    url: "https://taz.de/Studie-zu-globaler-Corona-Infektionsrate/!5730030/",
  },
  {
    identifier: Translate("Media"),
    date: "January 2021",
    title: "McKinsey on healthcare: 2020 year in review",
    img: "",
    url: "https://www.mckinsey.com/~/media/McKinsey/Industries/Healthcare%20Systems%20and%20Services/Our%20Insights/McKinsey%20on%20Healthcare%202020%20Year%20in%20Review/McKinsey-on-Healthcare-2020-Year-in-Review.pdf",
  },
  {
    identifier: Translate("Media"),
    date: "January 14, 2021",
    title: "Joule announces 2020 Innovation grant recipients",
    img: "",
    url: "https://markets.businessinsider.com/amp/news/joule-announces-2020-innovation-grant-recipients-1029968953",
  },
  {
    identifier: Translate("Media"),
    date: "January 15, 2021",
    title: "SeroTracker: Joule innovation grant recipient",
    img: "",
    url: "https://joulecma.ca/innovate/grants/serotracker ",
  },
  {
    identifier: Translate("Media"),
    date: "January 20, 2021",
    title: "When will the COVID-19 pandemic end?",
    img: "",
    url: "https://www.mckinsey.com/industries/healthcare-systems-and-services/our-insights/when-will-the-covid-19-pandemic-end",
  },
  {
    identifier: Translate("Media"),
    date: "January 23, 2021",
    title: "Joule announces 2020 Innovation grant recipients",
    img: "",
    url: "https://www.newswire.ca/news-releases/joule-announces-2020-innovation-grant-recipients-867798355.html",
  },
]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export const getCarouselOfMediaInsightCards = () => { 
  return (
    <Carousel 
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
    {
      listOfMediaInsightProps.map((insightProps, idx) => {
      return <InsightsCard
        identifier={insightProps.identifier}
        date={insightProps.date}
        img={insightProps.img}
        title={insightProps.title}
        url={insightProps.url} />
      })
    }
    </Carousel>
  )
}
