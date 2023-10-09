async function getRepo(repoOwner, repoName) {
  const githubAPIEndpoint = `https://api.github.com`;

  let fetchRepo = await fetch(`
    ${githubAPIEndpoint}/repos/${repoOwner}/${repoName}
  `);

  let repoData = await fetchRepo.json();

  return repoData;
}

async function getRepoCommits(repoOwner, repoName, commitAuthor) {
  const githubAPIEndpoint = `https://api.github.com`;
  let fetchRepo = await fetch(`
    ${githubAPIEndpoint}/repos/${repoOwner}/${repoName}/commits?author=${commitAuthor}
  `);
  let repoData = await fetchRepo.json();

  let recentCommits = [repoData[0], repoData[1]];

  return recentCommits;
}

function printCommitDate(utc_date) {
  const Months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date(utc_date);
  let month = date.getMonth();
  let dayOfMonth = date.getDate();

  return `${Months[month]} ${dayOfMonth}`;
}

class RepoHighlight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  repoOwner;
  repoName;
  repoDescription;
  commits;

  async connectedCallback() {
    this.repoOwner = this.attributes.getNamedItem('repo-owner').value;
    this.repoName = this.attributes.getNamedItem('repo-name').value;

    // Fetch the repo for the repo description:
    let repo = getRepo(this.repoOwner, this.repoName);
    let repoInfo = await repo;
    this.repoDescription = repoInfo.description;

    // // Fetch the repo commits
    let repoCommits = getRepoCommits(this.repoOwner, this.repoName, 'wagivens');
    let commitInfo = await repoCommits;
    this.commits = commitInfo;

    // Set the properties with the information
    const repoHighlightTemplate = document.createElement('template');
    repoHighlightTemplate.innerHTML = `<style>
            *,
            *::after,
            *::before {
              margin: 0;
              padding: 0;
              box-sizing: inherit;
            }
            
            .repo-highlight {
              display: flex;
              column-gap: 1.2rem;
              justify-content: center;
              padding: 0 1.2rem 1.2rem;
              border-radius: .5rem;
              max-width: 30.38rem;
              background:
              linear-gradient(
                105deg,
                hsl(204.07, 75.7%, 58.04%) 0%,
                hsl(203.93, 75.81%, 57.84%) 8.1%,
                hsl(204.07, 76.96%, 57.45%) 15.5%,
                hsl(203.93, 78.28%, 56.67%) 22.5%,
                hsl(203.67, 79.65%, 55.69%) 29%,
                hsl(203.81, 81.82%, 54.71%) 35.3%,
                hsl(203.7, 84.03%, 53.33%) 41.2%,
                hsl(203.6, 86.83%, 52.35%) 47.1%,
                hsl(203.41, 88.84%, 50.78%) 52.9%,
                hsl(203.38, 91.3%, 49.61%) 58.8%,
                hsl(203.12, 93.52%, 48.43%) 64.7%,
                hsl(203.12, 95.85%, 47.25%) 71%,
                hsl(203.12, 97.47%, 46.47%) 77.5%,
                hsl(203.12, 99.14%, 45.69%) 84.5%,
                hsl(202.96, 100%, 45.1%) 91.9%,
                hsl(202.96, 100%, 45.1%) 100%
              );
            }

            .repo-highlight > * {
              margin-top: 1.2rem;
            }
              
              .repo-highlight__image {
                width: 4rem;
                height: 4rem;
                box-shadow: 0 .4rem 1rem hsla(0, 0%, 0%, 0.2);
                border-radius: .8rem;
                object-fit: cover;
              }
              
              .repo-highlight__content > *:not(.repo-title) {
                margin-top: 1rem;
              }

              .repo-title, .repo-link, .repo-description, .commit-link, .commit-date, .commits-link {
                font-size: 1.4rem;
                color: var(--white);
              }

              .repo-description {
                line-height: 2rem;
              }
              
              .repo-commit {
                border-radius: .2rem;
                border: .15rem dashed #D9D9D9;
                padding: 1rem;
              }
              
              .repo-commit > *:not(:first-child) {
                margin-top: 1rem;
              }

              .commit-date {
                font-size: 1.4rem;
              }

              .all-commits {
                text-align: right;
              }

              .commits-link {
                text-decoration: none;
                font-weight: 500;
              }

              @media(min-width: 720px) {
              }
      </style>
        <div class="repo-highlight">
            <img class="repo-highlight__image" src="/custom_elements/image-placeholder-light.png" width="400px" height="400px">
            <div class="repo-highlight__content">
              <h3 class="repo-title">${this.repoOwner} / 
                  <a class="repo-link" href="https://github.com/${
                    this.repoOwner
                  }/${this.repoName}">${this.repoName}</a>
              </h3>
              <p class="repo-description">
                ${this.repoDescription}
              </p>
              <div class="repo-commit">
                <h4 class="commit-msg">
                  <a class="commit-link" 
                  href="${this.commits[0].html_url}">
                  ${this.commits[0].commit.message}
                  </a>
                </h4>
                <p class="commit-date">committed on ${printCommitDate(
                  this.commits[0].commit.author.date
                )}</p>
              </div>
              <div class="repo-commit">
                <h4 class="commit-msg">
                  <a class="commit-link" 
                  href="${this.commits[1].html_url}">
                  ${this.commits[1].commit.message}
                  </a>
                </h4>
                <p class="commit-date">committed on ${printCommitDate(
                  this.commits[1].commit.author.date
                )}</p>
              </div>
              <h3 class="all-commits">
                <a class="commits-link" href="https://github.com/${
                  this.repoOwner
                }/${this.repoName}/commits?author=wagivens">
                  All of My Commits &#10142;
                </a>
              </h3>
            </div>
        </div>
        `;
    this.shadowRoot.append(repoHighlightTemplate.content.cloneNode(true));
    /*
    Dark theme for component
    @media (prefers-color-scheme: dark) {
      .repo-highlight {
        background: none;
        background-color: hsl(220, 8%, 15%);
      }

      .repo-commit {
        border-color: hsla(0, 0%, 50%, 40%);
      }
    }
    */
  }
}

customElements.define('repo-highlight', RepoHighlight);
