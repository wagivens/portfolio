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
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
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
    this.repoOwner = this.attributes.getNamedItem('repo-owner').value
    this.repoName = this.attributes.getNamedItem('repo-name').value
    
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
    repoHighlightTemplate.innerHTML = 
      `<style>
            *,
            *::after,
            *::before {
              margin: 0;
              padding: 0;
              box-sizing: inherit;
            }
            
              .repo-highlight {
                padding: .1rem 1rem .5rem 1rem;
                border-radius: .5rem;
                width: 90%;
                max-width: 30rem;
                margin-top: 2rem;
                font-size: 1.4rem;
              }

              @media (prefers-color-scheme: dark) {
                .repo-highlight {
                  border: none;
                  background-color: hsl(216, 8%, 12%);
                }
              }
              
              .repo-highlight > * {
                margin-top: 1rem;
              }

              .repo-title {
                font-size: 1.6rem;
              }

              .repo-link, .commit-link, .commits-link {
                color: var(--blue);
              }

              @media (prefers-color-scheme: dark) {
                .repo-link, .commit-link, .commits-link {
                  color: var(--blue-dark-mode);
                }
              }

              .repo-description {
                line-height: 2rem;
              }

              @media (prefers-color-scheme: dark) {
                .repo-title, .repo-description {
                  color: var(--light-gray-dark-mode);
                }
              }
              
              .repo-highlight, .repo-commit {
                border: .1rem solid lightgray;
                border-radius: .2rem;
              }

              @media (prefers-color-scheme: dark) {
                .repo-highlight, .repo-commit {
                  border: none;
                }
              }
              
              .repo-commit {
                padding: 1rem;
              }

              @media (prefers-color-scheme: dark) {
                .repo-commit {
                  background-color: hsl(223, 7%, 19%);
                }
              }
              
              .repo-commit > *:not(:first-child) {
                margin-top: 1rem;
              }

              .all-commits {
                text-align: right;
              }

              .commits-link {
                text-decoration: none;
                font-weight: 500;
              }
              
              .commit-date {
                color: var(--gray-dark);
              }

              @media(prefers-color-scheme: dark) {
                .commit-date {
                  color: var(--white);
                }
              }

              @media(min-width: 720px) {
                .repo-highlight {
                  font-size: 1.6rem;
                }
                
                .repo-title {
                  font-size: 2rem;
                }
              }
      </style>
        <div class="repo-highlight">
            <h3 class="repo-title">${this.repoOwner} / 
                <a class="repo-link" href="https://github.com/${this.repoOwner}/${this.repoName}">${this.repoName}</a>
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
              <p class="commit-date">committed on ${printCommitDate(this.commits[0].commit.author.date)}</p>
            </div>
            <div class="repo-commit">
              <h4 class="commit-msg">
                <a class="commit-link" 
                href="${this.commits[1].html_url}">
                ${this.commits[1].commit.message}
                </a>
              </h4>
              <p class="commit-date">committed on ${printCommitDate(this.commits[1].commit.author.date)}</p>
            </div>
            <h3 class="all-commits">
              <a class="commits-link" href="https://github.com/${this.repoOwner}/${this.repoName}/commits?author=wagivens">
                All of My Commits &#10142;
              </a>
            </h3>
        </div>
        `;
		this.shadowRoot.append(repoHighlightTemplate.content.cloneNode(true));
	}
}

customElements.define('repo-highlight', RepoHighlight);