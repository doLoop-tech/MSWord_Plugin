import { Component, OnInit, NgZone } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { DiffMatchPatch } from 'ng-diff-match-patch';


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

  constructor(private content : ContentService , private zone : NgZone){}
  ngOnInit(){
    this.dmp = new DiffMatchPatch();
    document.getElementById("text").innerHTML = "<p></p>"

  }
  

   run() {
     this.showSimilarity = true;
     this.showDiff = false;
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
  }

  show(text){
   this.showDiff = true;
   this.selectedText = text;
    this.showSimilarity = false;
   //this.textDiff = text;
   this.textDiff = this.dmp.diff_main(this.data.input_text , text);
   this.dmp.diff_cleanupSemantic(this.textDiff);
   this.original = this.dmp.diff_prettyHtml(this.textDiff);
   document.getElementById("text").innerHTML = this.original;

  }

  hide(){
    this.showDiff = false;
    document.getElementById("text").innerHTML = "<p></p>"
     this.showSimilarity = true

  }
  
}

