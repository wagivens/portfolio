let mastoPostList = document.querySelector('.mastodon-status-list');
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

async function renderMastoStatusList(postID) {
  /* 
  {
    "id": "111175608994522310",
    "created_at": "2023-10-04T07:39:26.540Z",
    "in_reply_to_id": "111059300751595896",
    "in_reply_to_account_id": "110653476261631974",
    "sensitive": false,
    "spoiler_text": "",
    "visibility": "public",
    "language": "en",
    "uri": "https://mastodon.design/users/wgivensiv/statuses/111175608994522310",
    "url": "https://mastodon.design/@wgivensiv/111175608994522310",
    "replies_count": 0,
    "reblogs_count": 0,
    "favourites_count": 0,
    "edited_at": "2023-10-04T21:03:02.507Z",
    "content": "<p>Making some refinements to the business/activity screens this week; they needed a hierarchy overhaul.</p><p>Aside from removing the logo (which I’m doing everywhere) and making some icon tweaks, I removed the breadcrumbs, and moved the hero image to the top.</p><p>The category tag and review rating now have the same level of visual importance, and the Add button is better placed.</p>",
    "reblog": null,
    "application": {
        "name": "Mastodon for iOS",
        "website": "https://app.joinmastodon.org/ios"
    },
    "account": {
        "id": "110653476261631974",
        "username": "wgivensiv",
        "acct": "wgivensiv",
        "display_name": "Will Givens",
        "locked": false,
        "bot": false,
        "discoverable": true,
        "group": false,
        "created_at": "2023-07-04T00:00:00.000Z",
        "note": "<p>Software Interface Designer and Developer. CS student. Afrofuturist. 🏳️‍🌈<a href=\"https://mastodon.design/tags/Design\" class=\"mention hashtag\" rel=\"tag\">#<span>Design</span></a>, <a href=\"https://mastodon.design/tags/UXDesign\" class=\"mention hashtag\" rel=\"tag\">#<span>UXDesign</span></a>, <a href=\"https://mastodon.design/tags/ProductDesign\" class=\"mention hashtag\" rel=\"tag\">#<span>ProductDesign</span></a>, <a href=\"https://mastodon.design/tags/BlackMastodon\" class=\"mention hashtag\" rel=\"tag\">#<span>BlackMastodon</span></a>He / Him</p>",
        "url": "https://mastodon.design/@wgivensiv",
        "uri": "https://mastodon.design/users/wgivensiv",
        "avatar": "https://cdn.masto.host/mastodondesign/accounts/avatars/110/653/476/261/631/974/original/b86658e20c2379e2.png",
        "avatar_static": "https://cdn.masto.host/mastodondesign/accounts/avatars/110/653/476/261/631/974/original/b86658e20c2379e2.png",
        "header": "https://cdn.masto.host/mastodondesign/accounts/headers/110/653/476/261/631/974/original/1c3066be5c1f5fc3.png",
        "header_static": "https://cdn.masto.host/mastodondesign/accounts/headers/110/653/476/261/631/974/original/1c3066be5c1f5fc3.png",
        "followers_count": 12,
        "following_count": 92,
        "statuses_count": 214,
        "last_status_at": "2023-10-07",
        "noindex": false,
        "emojis": [],
        "roles": [],
        "fields": [
            {
                "name": "Portfolio",
                "value": "<a href=\"https://wagivens.github.io/\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">wagivens.github.io/</span><span class=\"invisible\"></span></a>",
                "verified_at": null
            },
            {
                "name": "Pixelfed",
                "value": "<a href=\"https://pixelfed.social/wgivensiv\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">pixelfed.social/wgivensiv</span><span class=\"invisible\"></span></a>",
                "verified_at": null
            },
            {
                "name": "Read.cv",
                "value": "<a href=\"https://read.cv/wagivens\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">read.cv/wagivens</span><span class=\"invisible\"></span></a>",
                "verified_at": "2023-09-10T00:49:54.758+00:00"
            },
            {
                "name": "Bento",
                "value": "<a href=\"https://bento.me/wgivensiv\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\" translate=\"no\"><span class=\"invisible\">https://</span><span class=\"\">bento.me/wgivensiv</span><span class=\"invisible\"></span></a>",
                "verified_at": "2023-07-04T20:35:54.858+00:00"
            }
        ]
    },
    "media_attachments": [
        {
            "id": "111178768501903566",
            "type": "image",
            "url": "https://cdn.masto.host/mastodondesign/media_attachments/files/111/178/768/501/903/566/original/30851ca1e3b0fb5c.png",
            "preview_url": "https://cdn.masto.host/mastodondesign/media_attachments/files/111/178/768/501/903/566/small/30851ca1e3b0fb5c.png",
            "remote_url": null,
            "preview_remote_url": null,
            "text_url": null,
            "meta": {
                "original": {
                    "width": 2640,
                    "height": 1440,
                    "size": "2640x1440",
                    "aspect": 1.8333333333333333
                },
                "small": {
                    "width": 650,
                    "height": 355,
                    "size": "650x355",
                    "aspect": 1.8309859154929577
                }
            },
            "description": null,
            "blurhash": "UGNm.,V?x^kC00t7tRWBM|-;x]M{?cxuozRj"
        }
    ],
    "mentions": [],
    "tags": [],
    "emojis": [],
    "card": null,
    "poll": null
}
  */

  await fetch(`
https://mastodon.design/api/v1/statuses/${postID}/context
  `).then((Response) => {
    Response.json().then((data) => {
      posts = data.descendants;
      console.log(posts);
      // For each status in the array,
      // create the HTML markup using the
      // data retrieve from the API:
      posts.forEach((status) => {
        let timestamp = new Date(status.created_at);
        let img = status.media_attachments[0];
        let postHTML = `
    <article class="mastodon-status">
    <img src=${
      status.account.avatar_static
    } alt="Account Avatar" class="mastodon-avatar" loading="lazy">
    <div class="status__content">
        <div class="status__headline">
            <div class="mastodon-account-details">
                <h3 class="mastodon-name">${status.account.display_name}</h3>
                <h3 class="mastodon-username">@${status.account.username}</h3>
                <h3 class="status-timestamp"> · 
                ${
                  monthNames[timestamp.getMonth()]
                } ${timestamp.getDate()}, ${timestamp.getFullYear()}</h3>
            </div>
        </div>
        <div class="status__text">
          ${status.content}
        </div>
        <div class="status__media">
            <${
              img.type === 'image'
                ? 'img'
                : 'video controls playsinline preload="none" autoplay loop muted'
            } 
            src=${img.url} 
            alt=${img.description} 
            class="status__image" loading="lazy">
        </div>
        <a href=${status.url} class="mastodon-link" target="_blank">
            View on Mastodon
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M8.37628 9.64632C9.87984 9.46678 11.189 8.54037 11.3535 7.69388C11.6128 6.36042 11.5914 4.43979 11.5914 4.43979C11.5914 1.83662 9.88585 1.0736 9.88585 1.0736C9.02591 0.678635 7.54925 0.512543 6.01511 0.5H5.97742C4.44328 0.512543 2.96759 0.678635 2.10758 1.0736C2.10758 1.0736 0.401985 1.83662 0.401985 4.43979C0.401985 4.5976 0.40117 4.76359 0.400321 4.93639C0.397962 5.41629 0.395346 5.94872 0.409226 6.50447C0.471163 9.05022 0.875952 11.5592 3.22969 12.1822C4.31495 12.4694 5.24672 12.5296 5.99714 12.4883C7.35801 12.4129 8.12194 12.0026 8.12194 12.0026L8.07707 11.0153C8.07707 11.0153 7.10457 11.3219 6.0124 11.2845C4.93031 11.2474 3.78796 11.1678 3.61295 9.83931C3.59679 9.72261 3.5887 9.59783 3.5887 9.46678C3.5887 9.46678 4.65094 9.72642 5.99714 9.7881C6.82029 9.82586 7.59224 9.73987 8.37628 9.64632ZM9.5796 7.79374V4.64174C9.5796 3.99754 9.41557 3.48562 9.08617 3.10689C8.74636 2.72816 8.30142 2.53401 7.74916 2.53401C7.11007 2.53401 6.62614 2.77962 6.30624 3.27091L5.99514 3.79234L5.68409 3.27091C5.36413 2.77962 4.8802 2.53401 4.24118 2.53401C3.68885 2.53401 3.24392 2.72816 2.90417 3.10689C2.5747 3.48562 2.41068 3.99754 2.41068 4.64174V7.79374H3.65944V4.73439C3.65944 4.08948 3.93078 3.76214 4.47354 3.76214C5.07364 3.76214 5.37447 4.15045 5.37447 4.91826V6.59282H6.61586V4.91826C6.61586 4.15045 6.91663 3.76214 7.51673 3.76214C8.05949 3.76214 8.33083 4.08948 8.33083 4.73439V7.79374H9.5796Z"
                    fill="#6364FF" />
            </svg>
        </a>
    </div>
</article>
    `;
        // Insert the HTML below <div class="mastodon-status-list">
        mastoPostList.insertAdjacentHTML('afterbegin', postHTML);
      });
    });
  });
}

renderMastoStatusList('111059300751595896');
