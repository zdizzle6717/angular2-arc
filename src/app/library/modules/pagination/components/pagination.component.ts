import { Component, Input, Output, Inject, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
    'selector': 'pagination',
    'providers': [],
    templateUrl: '../templates/pagination.html',
})
export class PaginationComponent {
    @Output() public onPageChange = new EventEmitter<any>();

    @Input() set pageNumber(currentPageNumber: number) {
        this.currentPageNumber = +currentPageNumber;
        this.pages = this.updatePagesArray(this.currentPageNumber, this.totalNumOfPages);
    }
    @Input() set pageSize(itemsPerPage: number) {
        this.itemsPerPage = +itemsPerPage;
    }
    @Input() set totalResults(totalItems: number) {
        this.totalItems = +totalItems;
    }
    @Input() set totalPages(totalNumOfPages: number) {
        this.totalNumOfPages = +totalNumOfPages;
        this.pages = this.updatePagesArray(this.currentPageNumber, this.totalNumOfPages);
    }

    public pages: number[] = [];
    public currentPageNumber: number = 1;
    public itemsPerPage: (number) = 20;
    public totalItems: (number) = 0;
    public totalNumOfPages: (number) = 1;

    public selectPage(pageNumber: number): void {
        this.onPageChange.emit(pageNumber);
        this.currentPageNumber = pageNumber;
    };

    public updatePagesArray(currentPageNumber: number, totalNumOfPages: number) {
        let phantomArray: number[] = [];
        let startPage: number;
        let endPage: number;

        for (let i = 0; i < totalNumOfPages; i++) {
            phantomArray.push(i + 1);
        }
        if (totalNumOfPages <= 5) {
            startPage = 1;
            endPage = totalNumOfPages;
        } else {
            if (currentPageNumber <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPageNumber + 2 >= totalNumOfPages) {
                startPage = totalNumOfPages - 4;
                endPage = totalNumOfPages;
            } else {
                startPage = currentPageNumber - 2;
                endPage = currentPageNumber + 2;
            }
        }

        return phantomArray.slice(startPage - 1, endPage);
    }

}
