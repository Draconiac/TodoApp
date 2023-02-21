import { Component } from '@angular/core';
import { Model } from '../model';
import { TodoItem } from '../todoitem';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  
  displayAll: boolean = false
  inputText: string = "";//çünkü ngModel ile two-way binding yapıldı

  constructor(){
    this.model.items = this.getItemsFromLS() //açılırken Localden verileri çek
  }

  model = new Model();
 
  addItem(){ 
    if(this.inputText != ""){
      let data ={description: this.inputText, action: false}
      this.model.items.push(data)

      let oldItemsFromLS = this.getItemsFromLS()
      oldItemsFromLS.push(data); //LS deki eski verilere yenisini ekle
      localStorage.setItem("items", JSON.stringify(oldItemsFromLS)) //LS ye yeni listeyi yolla

      this.inputText = ""
    }else
      alert("Lütfen Bilgi Giriniz");
  }

  getItemsFromLS(){

    let items: TodoItem[] = []  //TodoItem tipinde verilerim olacak    
    let value = localStorage.getItem("items") // items key adı ile verileri çek
    if(value != null){          
      items = JSON.parse(value)              //liste null değilse JSON a parse et
    }
    return items
  }

  getName(){
    return this.model.name;
  }

  getItems(){
    if(this.displayAll){
      return this.model.items;
    }
    return this.model.items.filter( (item) => item.action == true)
  }

  displayCount(){
    return this.model.items.filter(i => i.action).length
  }

  getBtnClasses(){
    return {
      'disabled': this.inputText.length == 0,
      'btn-secondary': this.inputText.length == 0,
      'btn-primary': this.inputText.length > 0
    }
  }

  onActionChanged(item: TodoItem){
    let items = this.getItemsFromLS();
    localStorage.clear();

    items.forEach( i => {
      if(i.description == item.description){
        i.action = item.action
      }
    })

    localStorage.setItem("items", JSON.stringify(items))
  }
}
