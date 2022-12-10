
 
function First(data) {
    let html=''
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
        data.forEach(item => {
            let name=item.title.lenght>20? item.slice(0,20)+'....':item.title;
            let content=item.description.lenght>45? item.slice(0,50)+'....':item.description;
              html+=`
              <div class="col-lg-3">    
              <div class=${item.rating.rate>3.5 ? 'pro':' '}>
                <div class="card">
                    <img src=${item.image} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 data-id=${item.id} id="h-name"class="card-title">${name}</h5>
                        <p class="card-text text-secondary">${content}</p>
                        <p class="card-text" >${item.price} $</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class=${item.rating.rate>3.5 ?'special':'secondary'}>${item.rating.rate}</p>
                            <i id="deletedbtn"class="fa-regular fa-trash-can"></i>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
              `
          });
          document.querySelector('#products').innerHTML=html
    })


    // .catch(err=>console.log(err))
}
First();
function AllProducts(){
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
       First(data)
    })
    .catch(error=>console.log(error))
}
AllProducts()
let input =document.querySelector('#Main .secury')
input.addEventListener('keyup',()=>{
    fetch('https://fakestoreapi.com/products')
    .then(response=>response.json())
    .then(data=>{
        let fks=document.querySelector('.fks')
        let exist=data.filter(item=>item.title.toLowerCase().includes(input.value.toLowerCase()))
        if (exist.length===0) {
            document.querySelector('#show').classList.remove('d-none')
            fks.classList.add('d-none')
        }else if(input.value.trim().length===0){
            fks.classList.add('d-none')
        }
        else {
            document.querySelector('#show').classList.add('d-none')
            fks.classList.remove('d-none')
            fks.querySelector('#count').innerHTML=exist.length
            fks.querySelector('#sp').innerHTML=input.value
            Common(exist)
        }   
    })
    .catch(error=>console.log(error))
})
function AllCategories(){
    fetch('https://fakestoreapi.com/products/categories')
    .then(response=>response.json())
    .then(data=>{
        let html=''
        data.forEach(item=>{
            html+=`

                   <li><a class="dropdown-item" href="#">${item}</a></li>
                `
        })
        
        document.querySelector('#Species').innerHTML=html
        let Species=document.querySelectorAll('#Species .dropdown-item');
        Species.forEach(Species=>{
            Species.onclick=function(){
                fetch(`https://fakestoreapi.com/products/category/${this.innerHTML}`)
                .then(response=>response.json())
                .then(data=>{
                    Common(data)
                })

                .catch(error=>console.log(error))
            }
        })
  })
    .catch(error=>console.log(error))
}
AllCategories()
function SortProduct(){
   let secondary=document.querySelector('#secondary')
   secondary.addEventListener('click',()=>{
    let secondary=secondary.querySelector('i')
    if (secondary.className==='fa-solid fa sort-up') {
        fetch('https://fakestoreapi.com/products?sort=desc')
        .then(res=>res.json())
        .then(data=>{
            Common(data)
            secondary.querySelector('i').className='fa-solid fa sort-down'
        })
        .catch(error=>console.log(error))
    } else {
        fetch('https://fakestoreapi.com/products?sort=asc')
        .then(res=>res.json())
        .then(data=>{
            Common(data)
            secondary.querySelector('i').className='fa-solid fa sort-up'
        })
        .catch(error=>console.log(error))
    } 
   })
}
SortProduct()