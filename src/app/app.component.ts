import { Component, OnInit, NgZone, ɵɵcontainerRefreshEnd } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { DiffMatchPatch } from 'ng-diff-match-patch';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public text;
  public showButton = true;
  public showSimilarity=false;
  public list = [];
  public sourceContent;
  public approvedContent;
  public data;
  public dmp : DiffMatchPatch;
  public original;
  public textDiff;
  public showDiff :Boolean;
  public selectedText;
  public showLogin : Boolean;
  public loginForm  :FormGroup;
  public token  : any;
  public failure  :Boolean;
  public error;
  public user;
  public name;

  constructor(private content : ContentService , private fb : FormBuilder ,  private zone : NgZone){
    this.loginForm = this.fb.group({
      "username" : [''],
      "password" : ['']
    })
  }
  ngOnInit(){
    if(localStorage.getItem("token")){
      this.showSimilarity = false;
      this.dmp = new DiffMatchPatch();
      document.getElementById("text").innerHTML = "<p></p>"
      this.content.getProfile().subscribe((data)=>{
        this.zone.run(()=>{
          this.user = data;
          this.name = this.user.data.firstName + " "+this.user
          .data.lastName
        })
      })
    }else{
      this.showLogin = true;

    }
    

  }
  

   run() {
     if(localStorage.getItem("token")){
      this.showSimilarity = true;
      this.showDiff = false;
      document.getElementById("text").innerHTML = "<p></p>"
      Word.run((context)=>{
       Office.context.document.getSelectedDataAsync(Office.CoercionType.Text , (result)=>{
         this.text = result.value;
         this.content.getContent(this.text).subscribe((data)=>{
           this.zone.run(()=>{
             this.data = data.data;
             this.sourceContent = data.data.similar_text.source_content;
             this.approvedContent = data.data.similar_text.approved_content;
             this.list = this.sourceContent.concat(this.approvedContent)
             
           });
         });
       });
       return context.sync()
      });
     }else{
       this.reset();
     }
     
  }

  show(text){
    if(localStorage.getItem("token")){
      this.showDiff = true;
      this.selectedText = text;
       this.showSimilarity = false;
      //this.textDiff = text;
      this.textDiff = this.dmp.diff_main(this.data.input_text , text);
      this.dmp.diff_cleanupSemantic(this.textDiff);
      this.original = this.dmp.diff_prettyHtml(this.textDiff);
      document.getElementById("text").innerHTML = this.original;
    }else{
     this.reset();
    }
   

  }

  hide(){
    this.showDiff = false;
    document.getElementById("text").innerHTML = "<p></p>"
     this.showSimilarity = true

  }

  login(){
    const username = this.loginForm.get("username").value;
    const password = this.loginForm.get("password").value;
    this.content.login(username , password).subscribe((data)=>{
      this.zone.run(()=>{
        this.token = data;
        if(this.token.error!=undefined ||this.token.error!=null ){
          this.failure = true;
          this.error = this.token.error;
        }else{
          this.failure = false;
          localStorage.setItem("token" , this.token.token);
          this.showLogin = false;
          this.showSimilarity = true;
          this.content.getProfile().subscribe((data)=>{
            this.zone.run(()=>{
              this.user = data;
              this.name = this.user.data.firstName + " "+this.user
              .data.lastName
            })
          })
        }
        
      })
    })

  }

  logout(){
    localStorage.removeItem("token");
    this.reset();
  }
  
  reset(){
    this.loginForm.get("username").setValue("")
       this.loginForm.get("password").setValue("");
       this.showLogin = true;
       this.showDiff = false;
       this.showSimilarity = false;
  }
 
}

