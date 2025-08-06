// const { act } = require("react");

const loadCategories = () => {
    // console.log('Loading Loading Loading');

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));

}
const loadCategoryVideo =(id)=>{

    
    // alert(id);

    // fetching loadCategoryVideo
      fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active');
            // console.log('Active class working',activeBtn);
            displayVideos(data.category);
        })
        .catch((error) => console.log(error));


}


displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");


    categories.forEach((item) => {

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML=
        `
        <button id='btn-${item.category_id}' onclick = "loadCategoryVideo(${item.category_id})" class = "btn category-btn">
        ${item.category}
        </button>
        `
      
        categoryContainer.append(buttonContainer);
    });

}


// load videos

const loadVideos = () => {
    // console.log('Loading Loading Loading');

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((res) => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error));

}

// const cardDemo= {
//     "category_id": "1001",
//     "video_id": "aaag",
//     "thumbnail": "https://i.ibb.co/DRxB1Wm/sunris.jpg",
//     "title": "Sunrise Reverie",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/yQFJ42h/ava.jpg",
//             "profile_name": "Ava Johnson",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "1.1K",
//         "posted_date": "16950"
//     },
//     "description": "'Sunrise Reverie' by Ava Johnson takes listeners on a serene journey through tranquil melodies and soft harmonies. With 1.1K views, this track is perfect for morning relaxation or an evening wind-down. Ava's heartfelt lyrics and soothing voice create a sense of peace, making it a go-to for fans seeking calm and inspiration in their musical choices."
// }
function getStringValue(time) {


    // const day = parseInt(time / 86400)


    const hour = parseInt(time / 3600);
    const remainingSecond = parseInt(time % 3600);
    const minute = parseInt(remainingSecond / 60);
    const second = minute % 60;
    return `${hour} hour ${minute} minute ${second} second ago`;


}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML='';

    if(videos.length == 0 ){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML=`
        <div class = 'min-h-[300px] flex flex-col gap-5 justify-center items-center '>
        <img src = 'assets/icon.png'>

        <h2>
        No Content Available Right Now
        </h2>
        </div>
        
        
        `;
    }
    else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) => {
        const card = document.createElement('div');
        card.classList = "card card-compact"
        card.innerHTML =
            `
         <figure class= 'h-[200px] relative'>
         <img src=${video.thumbnail}
         class='h-full w-full object-cover' />

         ${video.others.posted_date?.length == 0 ? '' : `<span class ='absolute right-2 bottom-2 bg-black rounded text-white'>
         ${getStringValue(video.others.posted_date)} </span>`}

         
         
        
         </figure>
  <div class="px-0 py-2 gap-2 flex">
        <div>
        <img class='h-8 w-8 rounded-full object-cover' src='${video.authors[0].profile_picture}'/>
        </div>
        <div>
        <h2 class ='font-bold'>${video.title}</h2>
        <div class='flex items-center gap-2'>
        <p class ='text-gray-400'>${video.authors[0].profile_name}</p>

        ${video.authors[0].verified == true ? `<img class='w-5' src='assets/icon.gif'/>` : ``}
        
        
        </div>
        <p>${video.others.views}</p>
        
        </div>
    
  </div>
        `
        console.log(video);
        videoContainer.append(card);
    })
    console.log(videos);




}





loadCategories();
loadVideos();