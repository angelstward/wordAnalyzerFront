import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { MessageModel } from "../models/message.model";
import { TextModel } from "../models/Text.model";
import { WordModel } from "../models/word.model";
import { SenderService } from "../services/sender.service";
import shajs from 'sha.js';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {  
    localStorage.clear();  
    this.GetToken();
  }

  constructor(private service: SenderService) {}

  public textToSend: string = "";
  public listWords: WordModel[];

  public ApplyChange(text: string) {
    this.textToSend = text;
  }

  public sendText() {
    const textModel: TextModel = {
      body: this.textToSend,
    };
    this.service
      .GetWords(textModel)
      .subscribe((x: MessageModel<WordModel[]>) => {
        if (x.status) {
          this.listWords = x.data;
        }
      });
      this.textToSend = "";
  }

  public cleanText(): void {
    this.textToSend = "";
    this.listWords = [];

  }

  private GetToken(): void{ 
    const secret = environment.secret; 
    this.service.GetToken({body: secret}).subscribe(response =>{
      if(response.status){
        localStorage.setItem("token", response.data);
      }
    });
  }


}
