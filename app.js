//hide preloader
//all the images scripts links have finished loading


//window event list


eventListeners();
function eventListeners(){

    const ui= new UI()
     //pre-loader
    window.addEventListener('load', function(){
        ui.hidePreloader();
    
})

//nav-btn
document.querySelector('.navBtn').addEventListener('click',function(){
  ui.showNav()
})

document.querySelector('.video_switch').addEventListener('click', function(){
    ui.videoControls()
})

//submit the form
document.querySelector('.drink-form').addEventListener('submit', function (event){
    event.preventDefault();
    const name= document.querySelector('.input-name').value ;
    const lastName = document.querySelector('.input-lastname').value ;
    const email = document.querySelector('.input-email').value ;

    let value = ui.checkEmpty(name,lastName,email)

    if(value){
        let customer = new Customer(name, lastName, email)
        console.log(customer);
        ui.addCustomer(customer)
        ui.showFeedback('customer added to the list', 'success')
        ui.clearFields()

    }
    else{
   ui.showFeedback('Some of the form values are empty','error')
    }
})

//display model
const links = document.querySelectorAll('.work-item_icon');
links.forEach(function(item){
 item.addEventListener('click',function (event){
    ui.showModel(event)

 })
})

//hide model
document.querySelector('.work-model_close').addEventListener('click',function()
{
    ui.closeModel()
})
}

//Constructor function
function UI(){
}
//hide preloader
UI.prototype.hidePreloader = function (){
    document.querySelector('.preloader').style.display ="none";
}
//show Nav
UI.prototype.showNav = function (){
    document.querySelector('.nav').classList.toggle('nav--show')
}
// play/pause the video
UI.prototype.videoControls = function(){
    let btn = document.querySelector('.video_switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide')
        document.querySelector('.video_item').pause()
    }
    else{
        btn.classList.remove('btnSlide')
        document.querySelector('.video_item').play()
    }
    
}

//check for the empty values
UI.prototype.checkEmpty = function (name, lastname, email){
    let result;
    if(name==='' || lastname ===''|| email ===''){
        result=false;
    }
    else{
        result=true;
    }
    return result;
}
    
//show feedback function
UI.prototype.showFeedback = function(text, type){
    const feedback = document.querySelector('.drink-form_feedback');
    if(type==='success'){
        
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');

    }
    else if (type==='error'){
        
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}

//remove alert
UI.prototype.removeAlert = function(type){
    setTimeout(function(){
    document.querySelector('.drink-form_feedback').classList.remove(type)
    },3000)

}

//Add customer
UI.prototype.addCustomer = function(customer){
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random() *images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `<img src="Image/person-${random}.jpeg" alt="person" class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_last-name">${customer.lastname}</h4>`
    document.querySelector('.drink-card_list').appendChild(div)
}

//clear the form fields
UI.prototype.clearFields = function(){
     document.querySelector('.input-name').value = '' ;
     document.querySelector('.input-lastname').value= '' ;
     document.querySelector('.input-email').value ='';
}

//show Model

UI.prototype.showModel = function(event){
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item_icon')){
    let id = event.target.parentElement.dataset.id

    const model= document.querySelector('.work-model');
    const modelItem = document.querySelector('.work-model_item');

    model.classList.add('work-model-show');
     modelItem.style.backgroundImage = `url(Image/work-${id}.jpeg)`
}
}

//hide model
UI.prototype.closeModel = function (){
    document.querySelector('.work-model').classList.remove('work-model-show')
}


//Object Constructor Function for Customer
function Customer(name, lastname, email){
    this.name = name,
    this.lastname = lastname,
    this.email  = email;
}