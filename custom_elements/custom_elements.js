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
                border: .1rem solid var(--blue);
                border-radius: .5rem;
                width: 90%;
                max-width: 30rem;
                margin-top: 2rem;
                font-size: 1.4rem;
                background-color: var(--white);
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

              .repo-description {
                line-height: 2rem;
              }
              
              .repo-commit {
                border-radius: .2rem;
              }
              
              .repo-commit {
                border: .05rem solid var(--gray);
                padding: 1rem;
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

              @media(min-width: 720px) {
                .repo-highlight {
                  font-size: 1.6rem;
                }
                
                .repo-title {
                  font-size: 2rem;
                }
              }

              @media (prefers-color-scheme: dark) {
                .repo-highlight {
                  background-color: hsl(220, 8%, 15%);
                }

                .repo-link, .commit-link, .commits-link {
                  color: var(--blue-dark-mode);
                }

                .repo-commit {
                  background-color: hsl(223, 7%, 20%);
                }
                
                .repo-highlight, .repo-commit {
                  border: none;
                }

                .repo-title, .repo-description {
                  color: var(--light-gray-dark-mode);
                }

                .commit-date {
                  color: var(--white);
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

class ProjectHighlight extends HTMLElement
{
  constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

  thumbnailName;
  title;
  blurb;

  async connectedCallback()
  {
    this.thumbnailName = this.attributes.getNamedItem('thumbnail').value;
    this.title = this.attributes.getNamedItem('title').value;
    this.blurb = this.attributes.getNamedItem('blurb').value;
    
    const projectHighlightTemplate = document.createElement('template');
    projectHighlightTemplate.innerHTML = 
    `
    <style>
      *,
      *::after,
      *::before {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
      }

      a
      {
        text-decoration: none;
        color: inherit;
        display: inline-block;
      }
      
      .project-highlight
      {
        width: fit-content;
        max-width: 38.5rem;
        height: 52.5rem;
        display: flex;
        flex-direction: column;
      }

      .project-hightlight__thumbnail
      {
        height: 70%;
        width: 100%;
        overflow-y: hidden;
        object-fit: fill;
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
      }

      .project-hightlight__thumbnail > img
      {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .project-highlight__details
      {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        background-color: hsl(0, 0%, 92%);
        padding: 2rem 1.5rem;
        flex-grow: 1;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
      }

      .project-highlight__title, .project-highlight__blurb
      {
        font-size: clamp(1.6rem, 1.25vw, 3rem);
      }

      .project-highlight__title
      {
        font-weight: 600;
      }

      .project-highlight__blurb
      {
        font-weight: 500;
        line-height: 3rem;
        color: var(--gray);
      }

      @media(prefers-color-scheme: dark)
      {
        .project-highlight__details
        {
          background-color: hsl(0, 0%, 10%);
        }

        .project-highlight__title
        {
          color: var(--white);
        }

        .project-highlight__blurb
        {
          color: var(--gray);
        }
      }
    </style>
    <a href="/projects/messages/messages.html">
      <div class="project-highlight">
        <div class="project-hightlight__thumbnail">
          <img src="../project_thumbnails/${this.thumbnailName}">
        </div>
        <div class="project-highlight__details">
          <h2 class="project-highlight__title">${this.title}</h2>
          <p class="project-highlight__blurb">${this.blurb}</p>
        </div>
      </div>
    </a>
    `;
    this.shadowRoot.append(projectHighlightTemplate.content.cloneNode(true));
  }
  
}

customElements.define('repo-highlight', RepoHighlight);
customElements.define('project-highlight', ProjectHighlight);