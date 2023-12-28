import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { scrollToTop } from "./globalFunctions/scrollToTop";
import Navbar from "./components/Navbar";
import Router from "./pages/router";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import Conragts from "./components/Congrats";
import { getUser, login } from "./actions/authActions";
import { fetchingContact, usePostRequest } from "./actions/apiActions";
import { RootState } from "./store/configureStore";

function App() {
  const [signIn, setSignIn] = useState(false);
  const dispatch = useDispatch();

  const ct = document.querySelectorAll(".ecosystemDetails_partners");

  let isDown = false;
  //@ts-ignore
  let startX;
  //@ts-ignore
  let scrollLeft;
  ct[0]?.addEventListener("mousedown", e => {
    //@ts-ignore
    isDown = true;
    //@ts-ignore
    startX = e.pageX - ct[0].offsetLeft;
    //@ts-ignore
    scrollLeft = ct[0].scrollLeft;
  });
  ct[0]?.addEventListener("mouseleave", () => {
    //@ts-ignore
    isDown = false;
  });
  ct[0]?.addEventListener("mouseup", () => {
    isDown = false;
  });
  ct[0]?.addEventListener("mousemove", e => {
    if (!isDown) return;
    e.preventDefault();
    //@ts-ignore
    const x = e.pageX - ct[0].offsetLeft;
    //@ts-ignore
    const walk = (x - startX) * 2;
    //@ts-ignore
    ct[0].scrollLeft = scrollLeft - walk;
  });
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token") && !isAuthenticated) {
      dispatch(login());
    }
    // @ts-ignore
    dispatch(fetchingContact("contact-us"));
  }, [dispatch, isAuthenticated]);

  const existingProjects = JSON.parse(
    localStorage.getItem("favoriteProjects") || "[]"
  );

  const { postRequest } = usePostRequest();
  //@ts-ignore
  const user = JSON.parse(localStorage.getItem("user"));
  const [callUserFavorite, setCallUserFavorite] = useState(false);

  useEffect(() => {
    if (existingProjects && isAuthenticated && !callUserFavorite) {
      postRequest(
        "create-user-favorite",
        {
          project_id: existingProjects,
          user_id: user?.id,
        },
        {}
      );
      setCallUserFavorite(true);
    }
  }, [existingProjects, isAuthenticated, callUserFavorite]);

  // });
  // const { postRequest, response } = usePostRequest();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     // dispatch(login());
  //     postRequest(
  //       "get-user",
  //       {
  //         token: localStorage.getItem("token"),
  //       },
  //       {}
  //     );
  //     // dispatch(login());
  //   }
  //   //@ts-ignore
  //   dispatch(fetchingContact("contact-us"));
  //   //@ts-ignore
  //   // dispatch(getUser("get-user"));
  // }, [dispatch, postRequest]);

  // useEffect(() => {
  //   if (response && response.status === 200) {
  //     dispatch(login());
  //     dispatch(getUser(response.data));
  //   }
  // }, [response, dispatch]);

  return (
    <div className='container'>
      <Navbar setOpenModal={setSignIn} signIn={signIn} />
      <Router />
      {/* <SignIn setSignUp={setSignUp} /> */}
      {/* <SignUp /> */}
      {/* <AccountTypeModal /> */}
      {/* <AgreementTermsModal /> */}
      {/* <Privacy /> */}
      {/* <Donation
        setSignUp={setSignUp}
        setOneTimeDonation={setOneTimeDonation}
        setDonateProjects={setDonateProjects}
      /> */}
      {/* <OneTimeDonation
        oneTimeDonation={oneTimeDonation}
        setOneTimeDonation={setOneTimeDonation}
        handleClose={() => {
          setOneTimeDonation(false);
          dispatch(openDonateModal(true));
        }}
      /> */}
      {/* <DonationProjectsModal
        donateProjects={donateProjects}
        setDonateProjects={setDonateProjects}
      /> */}
      {/* <DonateToTheProject /> */}
      {/* <RecommentedModal /> */}
      <Conragts />
    </div>
  );
}

export default App;
