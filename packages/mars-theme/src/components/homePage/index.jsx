import React, { useState } from 'react';
import { styled } from "frontity";
import Link from "@frontity/components/link"
import Popup from "../Popup";
import axios from 'axios';

function HomePage() {

  const [repoList, setRepoList] = useState([]);
  const [popupUrl, setPopupUrl] = useState();

  const handleClick = () => {
    const inputValue = document.getElementsByTagName("input")[0].value;

    axios.get(`https://api.github.com/orgs/${inputValue}/repos`)
    .then(res => { setRepoList(res.data); }).catch(function (error) { setRepoList("error"); });

  }

  return (
    <GithubApp>
          <Popup popupURL={popupUrl} setPopupUrl={setPopupUrl} />
          <SearchContainer>
            <input />
            <button onClick={handleClick}>Load</button>
          </SearchContainer>
          {
            repoList === "error" ?
            <ErrorMessage>We didnt find any information on this repo</ErrorMessage>
            :
            repoList.length > 0 ?
          <GridContainer>
            <InnerGrid>Name</InnerGrid>
            <InnerGrid>Link to profile page</InnerGrid>
            <InnerGrid>Description</InnerGrid>
            <InnerGrid>Size</InnerGrid>
            <InnerGrid>Language</InnerGrid>
            <InnerGrid>Information about contributors</InnerGrid>
            {
              repoList.map((repo) =>
              <>
              <InnerGrid>{repo.name}</InnerGrid>
              <InnerGrid style={{cursor:"pointer"}}><Link link={repo.html_url} target="_blank">Click Here</Link></InnerGrid>
              <InnerGrid>{repo.description}</InnerGrid>
              <InnerGrid>{repo.size}</InnerGrid>
              <InnerGrid>{repo.language}</InnerGrid>
              <InnerGrid onClick={() => setPopupUrl(repo.contributors_url)} style={{cursor:"pointer"}}>Click Here</InnerGrid>
              </>
          )
        }
        </GridContainer>
         :
        <></>
        }

    </GithubApp>
  )
}

export default HomePage

const GithubApp = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100vw;
  padding: 5rem 0;
  background: whitesmoke;
  min-height: 60vh;
`;

const ErrorMessage = styled.div`
background: white;
padding: 1rem;
color: maroon;
margin-top: 1rem
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  max-width: 800px;
  background: whitesmoke;
  grid-gap: 1px;
  border: 1px solid whitesmoke;
  margin: 1rem 0;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
`;

const InnerGrid = styled.div`
  background: white;
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: initial;
`;