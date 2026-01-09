import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // <-- Importante
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-form',
  standalone: true, // Si es standalone
  imports: [CommonModule, MatTableModule], // <-- Aquí se añade
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'description'];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data: any[]) => this.categories = data,
      error: (err: any) => console.error('Error loading categories', err)
    });
  }
}
