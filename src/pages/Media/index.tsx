import Background from "../../components/Background";
import SIDE_PATTERN from "../../assets/patterns/side-about-us.svg";
import SIDE_PATTERN_MOBILE from "../../assets/patterns/side-1-mobile.svg";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet";
import { useWindowSize } from "../../hooks/useWindowSize";
import Header from "../../components/Header";
import IMG_1 from "../../assets/medias/img-1.svg";
import IMG_2 from "../../assets/medias/pdf-1.svg";
import PDF from "../../assets/projectAuthor/pdf.svg";
import PLAY_ICON from "../../assets/medias/play-icon.svg";
import "./index.css";
import { useState } from "react";
import Button from "../../components/Button";
import ARROW_NEXT from "../../assets/arrow-next.svg";
import Modal from "../../components/Modal";
import EcosystemModal from "../../components/EcosystemModal";
import ReactPlayer from "react-player";
import CLOSE from "../../assets/medias/close-modal.svg";
import IMG_3 from "../../assets/medias/img-2.svg";

const Media = () => {
  const windowSize = useWindowSize();

  const medias = [
    {
      id: 1,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_1,
      fileType: "video",
    },
    {
      id: 2,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_1,
      fileType: "video",
    },
    {
      id: 3,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_1,
      fileType: "video",
    },
    {
      id: 4,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_1,
      fileType: "video",
    },
    {
      id: 5,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_1,
      fileType: "video",
    },
    {
      id: 6,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_2,
      fileType: "pdf",
    },
    {
      id: 7,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_2,
      fileType: "pdf",
    },
    {
      id: 8,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_2,
      fileType: "pdf",
    },
    {
      id: 9,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_2,
      fileType: "pdf",
    },
    {
      id: 10,
      title: "Media category",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      img: IMG_2,
      fileType: "pdf",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = medias?.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages =
    medias && new Array(Math.ceil(medias?.length / projectsPerPage)).fill(0);

  const [openVideo, setOpenVideo] = useState(false);
  const [openBook, setOpenBook] = useState(false);

  return (
    <div className='media_container'>
      <Helmet>
        <title>Media</title>
      </Helmet>
      <Background
        pattern1={windowSize.width < 800 ? SIDE_PATTERN_MOBILE : SIDE_PATTERN}
        style={{
          flexDirection: "column",
          gap: "40px",
          padding: 0,
          paddingBottom: "40px",
        }}>
        <div className='media_header_wrapper'>
          <Header
            title='Media'
            description="<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>"
          />
        </div>
        <div className='medias_wrapper'>
          {currentProjects.map((media, i) => (
            <div
              className={`${
                media.fileType === "pdf" && "media_pdf_wrapper"
              } media_wrapper`}
              onClick={() => {
                media.fileType === "pdf" && setOpenBook(true);
              }}
              key={i}>
              <div className='media_img_wrapper'>
                <img
                  src={media.img}
                  alt='Media'
                  className='media_img_bg'
                  decoding='async'
                  loading='lazy'
                />
                {media.fileType === "video" && (
                  <button
                    className='media_play_btn'
                    onClick={() => setOpenVideo(true)}>
                    <img
                      src={PLAY_ICON}
                      alt='Play'
                      decoding='async'
                      loading='lazy'
                    />
                  </button>
                )}
              </div>
              <div className='media_info_wrapper'>
                <p className='media_info_title'>{media.title}</p>
                <p className='media_info_desc'>{media.desc}</p>
                {media.fileType === "pdf" && (
                  <div className='media_info_pdf_wrapper'>
                    <div className='media_info_pdf'>
                      <img
                        src={PDF}
                        alt='Pdf'
                        decoding='async'
                        loading='lazy'
                      />
                      <p>Download</p>
                    </div>
                    <p className='media_pdf_price'>{20}$</p>
                  </div>
                )}
              </div>
            </div>
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
      {/* {openVideo && ( */}
      <div className='video_modal'>
        <Modal setOpenModal={setOpenVideo} openModal={openVideo}>
          <EcosystemModal
            back={true}
            className='modal_back'
            onClose={() => setOpenVideo(false)}
            header={""}
            closeIcon={CLOSE}>
            <div className='media_video'>
              <ReactPlayer
                url={"https://www.youtube.com/watch?v=fNxeQNX_WmY"}
                width='100%'
                controls
              />
            </div>
          </EcosystemModal>
        </Modal>
      </div>
      {/* )} */}
      {/* {openBook && ( */}
      <Modal setOpenModal={setOpenBook} openModal={openBook}>
        <EcosystemModal
          back={true}
          className='modal_back'
          onClose={() => setOpenBook(false)}
          header={"book"}>
          <div className='media_pdf_modal_book_wrapper'>
            <div className='media_book_img'>
              <img src={IMG_3} alt='Book' decoding='async' loading='lazy' />
            </div>
            <div className='media_book_desc_wrapper'>
              <p className='media_book_desc_title media_info_title'>
                Lorem Ipsum is simply dummy text of the printing
              </p>
              <p className='media_book_desc_info media_info_title'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <div className='media_book_pdf_wrapper'>
                <div className='media_info_pdf'>
                  <img src={PDF} alt='Pdf' decoding='async' loading='lazy' />
                  <p>Download</p>
                </div>
                <div className='media_book_price media_pdf_price'>
                  <p>
                    Price <span>{20}$</span>
                  </p>
                </div>
              </div>
              <Button
                text='Download the book for 20$'
                link={false}
                to={""}
                style={{ background: "#DD264E", color: "#fff" }}
              />
            </div>
          </div>
        </EcosystemModal>
      </Modal>
      {/* )} */}
    </div>
  );
};

export default Media;
