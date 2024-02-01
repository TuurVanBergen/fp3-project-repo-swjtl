"use strict";

export default class List {
    constructor(name, description, qCode,dateOfBirth,dateOfDeath, category, image) {
        this.name = name;
        this.description = description;
        this.qCode = qCode;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.category = category;
        this.image = image;
    }
    
    get htmlString() {
    
        if(this.image){
            return `<div class="box">
            <img src="${this.image}" alt="" />
            <h3>${this.name}</h3>
            <p>${this.description}</p>
            <a href="objectInfo.html?qCode=${this.qCode}&category=${this.category}" id="button"">More</a>
            </div>`;
        }else{
            return `<div class="box">
            <img src="./images/icon-image-not-found-free-vector.jpg" alt="" />
            <h3>${this.name}</h3>
            <p>${this.description}</p>
            <a href="objectInfo.html?qCode=${this.qCode}&category=${this.category}" id="button"">More</a>
            </div>`;
        }
    }
}
