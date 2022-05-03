import React, { useState, useEffect } from 'react';
import { styled, keyframes  } from "frontity";
import Link from "@frontity/components/link"
import CloseButton from '../close-button.svg';
import axios from 'axios';

const calculateContributaions = (contributions, constributionSum) => {
  if(!contributions){ return }
  return (contributions/constributionSum*100).toFixed(2);
}

function Popup({popupURL, setPopupUrl}) {

  const [constributionData,setConstributionData] = useState([]);
  const [constributionSum,setConstributionSum] = useState(0);
  
  useEffect(() => {
    if(popupURL) {
      axios.get(popupURL).then(res => {
        setConstributionData(res.data)
        let sum = 0;
        res.data.forEach((element) => {
          sum += element.contributions
        })
        
        setConstributionSum(sum)
      })}
  }, [popupURL]);

  if(!popupURL) return null
  return (
    
    <PopupContainerDiv>
    {
    constributionData.length > 0 ?
        <>
          <CloseButtonImage src={CloseButton} onClick={() => setPopupUrl()}/>
          <GridContainer style={{gridTemplateColumns:"auto auto auto auto auto"}}>
          <InnerGrid>Nickname</InnerGrid>
          <InnerGrid>Link to profile page</InnerGrid>
          <InnerGrid>Avatar picture</InnerGrid>
          <InnerGrid>Amount of contributions (count)</InnerGrid>
          <InnerGrid>Amount of contributions (percent)</InnerGrid>
          {
            constributionData.map((contributor) =>
            <>
            <InnerGrid>{contributor.login}</InnerGrid>
            <InnerGrid><Link link={contributor.html_url} target="_blank">Click Here</Link></InnerGrid>
            <InnerGrid><ContributorImage style={{backgroundImage: contributor.avatar_url}}/></InnerGrid>
            <InnerGrid>{contributor.contributions}</InnerGrid>
            <InnerGrid>{calculateContributaions(contributor.contributions, constributionSum)}</InnerGrid>      
            </>
            )
          }
          </GridContainer>
          </>
      :
      <>
      <CloseButtonImage src={CloseButton} onClick={() => setPopupUrl()}/>
      <div>
        empty
      </div>
      </>
      }
      </PopupContainerDiv>
  )
}

export default Popup

const tiltInFwdTr = keyframes`
  0% {
    -webkit-transform: rotateY(20deg) rotateX(35deg) translate(100px, -100px) skew(-35deg, 10deg);
    transform: rotateY(20deg) rotateX(35deg) translate(100px, -100px) skew(-35deg, 10deg);
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    opacity: 1;
  }
`;

const CloseButtonImage = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  filter: invert(1);
  cursor:pointer;
  z-index:-99;
`;

const InnerGrid = styled.div`
  background: white;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const PopupContainerDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  background: #0f153f57;
  backdrop-filter: blur(5px);
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  max-width: 800px;
  background: whitesmoke;
  grid-gap: 1px;
  border: 1px solid whitesmoke;
  margin: 1rem 0;
  -webkit-animation: ${tiltInFwdTr} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  animation: ${tiltInFwdTr} 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const ContributorImage = styled.div`
  width: 3rem;
  height: 3rem;
  background: whitesmoke;
  background-image: url(https://avatars.githubusercontent.com/u/12269096?v=4);
  background-size: cover;
  border-radius: 100%;
`;

