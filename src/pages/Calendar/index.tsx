import Background from "../../components/Background";
import SIDE_PATTERN from "../../assets/patterns/side-about-us.svg";
import SIDE_PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { useWindowSize } from "../../hooks/useWindowSize";
import Header from "../../components/Header";
import IMG_1 from "../../assets/calendar/img-1.png";
import "./index.css";
import { useState } from "react";
import Button from "../../components/Button";
import ARROW_NEXT from "../../assets/arrow-next.svg";
import ICON from "../../assets/info/4.svg";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Radio } from "antd";
import SingleEvent from "../../components/SingleEvent";

const items: MenuProps["items"] = [
  {
    label: (
      <div className='calendar_date_item'>
        <p>Any Date</p>
        <Radio></Radio>
      </div>
    ),
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: (
      <div className='calendar_date_item'>
        <p>This week</p>
        <Radio></Radio>
      </div>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: (
      <div className='calendar_date_item'>
        <p>This month</p>
        <Radio></Radio>
      </div>
    ),
    key: "2",
  },
];

export const events = [
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
  {
    id: 1,
    title: "Lorem Ipsum is simply dummy ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    img: IMG_1,
    address: "Ереван, ул. Московяна 24",
    date: "Fri, 10 Nov AM 10:30",
  },
];

const Calendar = () => {
  const windowSize = useWindowSize();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = events?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages =
    events && new Array(Math.ceil(events?.length / projectsPerPage)).fill(0);

  const [openVideo, setOpenVideo] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  //   const arr = new Array(5).fill("");
  const arr = [
    {
      name: "all",
    },
    {
      name: "Education",
    },
    {
      name: "Science",
    },
    {
      name: "Culture",
    },
    {
      name: "Innovation",
    },
    {
      name: "Territory development",
    },
  ];

  return (
    <div className='calendar_container'>
      <Helmet>
        <title>Calendar</title>
      </Helmet>
      <Background
        pattern1={windowSize.width < 800 ? SIDE_PATTERN_MOBILE : SIDE_PATTERN}
        style={{
          flexDirection: "column",
          gap: "40px",
          padding: 0,
          paddingBottom: "40px",
        }}>
        <div className='media_header_wrapper calendar_header_wrapper'>
          <Header
            title='Calendar'
            description="<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
            icon={ICON}
          />
          <div className='calendar_filtering_wrapper'>
            <p className='calendar_filtering_title'>events by category</p>
            <div className='calendar_filtering'>
              <div className='calendar_filtering_items'>
                {arr.map((a, i) => (
                  <button className='calendar_filter_item' key={i}>
                    {a.name}
                  </button>
                ))}
              </div>
              <div className='calendar_filtering_date'>
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  className='calendar_dropdown'>
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      Any date
                      <DownOutlined color='#fff' />
                    </Space>
                  </a>
                </Dropdown>
                <div className='calendar_selected_date'>
                  <p>This week</p>
                  <CloseOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='events_wrapper calendars_wrapper'>
          {currentProjects.map((event, i) => (
            <SingleEvent
              img={event.img}
              title={event.title}
              desc={event.desc}
              address={event.address}
              date={event.date}
            />
          ))}
        </div>
        {totalPages && totalPages.length > 1 && !!currentProjects?.length && (
          <div className='pagination'>
            <Button
              text='Prev'
              link={false}
              to={""}
              icon={ARROW_NEXT}
              onClick={() => setCurrentPage(currentPage - 1)}
              style={{
                border: "1px solid #000",
                gap: "10px",
                fontWeight: "500",
                opacity: currentPage === 1 ? 0 : 1,
                cursor: currentPage === 1 ? "unset" : "pointer",
              }}
              className='pagination_backBtn'
            />
            <div className='paginationBtnWrapper'>
              {totalPages.map((_: any, i: number) => (
                <button
                  key={i}
                  className={`${
                    currentPage === i + 1 && "paginationBtn_active"
                  } paginationBtn`}
                  onClick={() => setCurrentPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
            </div>
            <Button
              text='Next'
              link={false}
              to={""}
              icon={ARROW_NEXT}
              onClick={() => setCurrentPage(currentPage + 1)}
              style={{
                border: "1px solid #000",
                gap: "10px",
                fontWeight: "500",
              }}
              disabled={currentPage === totalPages.length}
            />
          </div>
        )}
      </Background>
      <Footer />
    </div>
  );
};

export default Calendar;
