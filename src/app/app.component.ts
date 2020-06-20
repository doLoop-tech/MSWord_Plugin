import { Component, OnInit, NgZone } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';


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

  constructor(private content : ContentService , private zone : NgZone){}

  ngOnInit(){
  }

   run() {
     this.showSimilarity=true;
     Word.run((context)=>{
      Office.context.document.getSelectedDataAsync(Office.CoercionType.Text , (result)=>{
        this.text = result.value;
        this.content.getContent(this.text).subscribe((data)=>{
          this.zone.run(()=>{
            this.sourceContent = data.data.similar_text.source_content;
            this.approvedContent = data.data.similar_text.approved_content;
            this.list = this.sourceContent.concat(this.approvedContent)
            
          })
        })
        // const http = new XMLHttpRequest();
        // const url = "http://localhost:8000/getContent";
        // http.onreadystatechange = ()=>{
        //   if(http.readyState==XMLHttpRequest.DONE){
        //       this.showSimilarity = true;
        //       this.list = JSON.parse(http.responseText);
        //       this.data = this.list.data.similar_text.source_content;
        //   }
        // }
        // http.open("POST" , url );
        // http.setRequestHeader("Authorization" , "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtZGVzYWkiLCJhdXRoIjoiUk9MRV9VU0VSX0NSRUFURSxST0xFX1VTRVJfVklFVyxST0xFX1VTRVJfRURJVCxST0xFX1VTRVJfREVMRVRFLFJPTEVfUk9MRV9DUkVBVEUsUk9MRV9ST0xFX1ZJRVcsUk9MRV9ST0xFX0VESVQsUk9MRV9ST0xFX0RFTEVURSxST0xFX0dST1VQX0NSRUFURSxST0xFX0dST1VQX1ZJRVcsUk9MRV9HUk9VUF9FRElULFJPTEVfR1JPVVBfREVMRVRFLFJPTEVfQVVESVRfVklFVyxST0xFX0FQUFJPVkVEX0NPTlRFTlRfVklFVyxST0xFX1NUQUdJTkdfQ09OVEVOVF9WSUVXLFJPTEVfUFJPSkVDVF9DUkVBVEUsUk9MRV9BSV9WSUVXLFJPTEVfU09VUkNFX0RPQ1VNRU5UX1ZJRVcsUk9MRV9TT1VSQ0VfRE9DVU1FTlRfQ1JFQVRFLFJPTEVfU09VUkNFX0RPQ1VNRU5UX0RFTEVURSxST0xFX1NFVFRJTkdTX1ZJRVcsUk9MRV9QUk9KRUNUX1ZJRVcsUk9MRV9QUk9KRUNUX0VESVQsUk9MRV9QUk9KRUNUX0RFTEVURSxST0xFX1BST0pFQ1RfUlVOLFJPTEVfUFJPUEVSVFlfVklFVyxST0xFX1BST1BFUlRZX0NSRUFURSxST0xFX1BST1BFUlRZX0VESVQsUk9MRV9QUk9QRVJUWV9ERUxFVEUsUk9MRV9TT1VSQ0VfRE9DVU1FTlRfRVhUUkFDVF9CT09LTUFSSyxST0xFX0FQUFJPVkVEX0RPQ1VNRU5UX1ZJRVcsUk9MRV9BUFBST1ZFRF9ET0NVTUVOVF9DUkVBVEUsUk9MRV9BUFBST1ZFRF9ET0NVTUVOVF9FRElULFJPTEVfQVBQUk9WRURfRE9DVU1FTlRfREVMRVRFLFJPTEVfU1RBR0lOR19DUkVBVEUsUk9MRV9TVEFHSU5HX1ZJRVcsUk9MRV9TVEFHSU5HX0RFVEFJTFNfVklFVyxST0xFX1NUQUdJTkdfREVUQUlMU19DUkVBVEUsUk9MRV9BUFBST1ZFRF9DT05URU5UX0NSRUFURSxST0xFX1NUQUdJTkdfREVUQUlMU19SRUpFQ1QsUk9MRV9BUFBST1ZFRF9TRUNUSU9OX0NSRUFURSxST0xFX0FQUFJPVkVEX1NFQ1RJT05fRURJVCxST0xFX0FQUFJPVkVEX1NFQ1RJT05fREVMRVRFLFJPTEVfQVBQUk9WRURfQ09OVEVOVF9FRElULFJPTEVfU09VUkNFX0RPQ1VNRU5UX0VYVFJBQ1RfVEVYVCxST0xFX1NPVVJDRV9ET0NVTUVOVF9FRElULFJPTEVfU1RBR0lOR19SRUpFQ1QsUk9MRV9EQVNIQk9BUkRfVklFVyxST0xFX1JVTl9SRUNPTU1FTkRBVElPTixST0xFX0VWRU5UX1NVQlNDUklQVElPTixST0xFX1NFVFRJTkdTX0VESVQsUk9MRV9QUk9KRUNUX0FETUlOLFJPTEVfVklFV19MSUNFTlNFIiwiY3JlYXRlZCI6MTU5MjU0NjQxMDU5NCwiZXhwIjoxNzcyNTQ2NDEwfQ.02KP7CSpnyWF3cexc9UOvsk0eMeJt0m83vLOeUZ4C53SESBwmUTdwAtbR_Wx-Wb5XwJ4BQfE3VygKuALrjFyMA");
        // http.send(this.text);
      });
      return context.sync()
     })
    
  }
}

