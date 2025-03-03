import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ArticleService} from '../../services/article/article.service';
import {Articles} from '../../interfaces/articles';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from '@angular/material/card';
import {SlicePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-article-list',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent implements OnInit {
  articlesService:ArticleService = inject(ArticleService);
  articles:WritableSignal<Articles[]> = signal([]);

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles():void {
    this.articlesService.getArticles().subscribe(articles => {
       this.articles.set(articles);
    })
  }


}
