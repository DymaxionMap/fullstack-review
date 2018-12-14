import React from 'react';

const RepoList = (props) => {
  const repos = props.repos.map(repo => {
    return (
      <ul>
        <li>name: {repo.name}</li>
        <li>username: {repo.username}</li>
        <li>url: {repo.url}</li>
        <li>description: {repo.description}</li>
        <li>stars: {repo.starsCount}</li>
      </ul>
    );
  });
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {repos}
    </div>
  );
};

export default RepoList;