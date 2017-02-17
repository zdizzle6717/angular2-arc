"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.pages = [];
        this.currentPageNumber = 1;
        this.itemsPerPage = 20;
        this.totalItems = 0;
        this.totalNumOfPages = 1;
        this.onPageChange = new core_1.EventEmitter();
    }
    Object.defineProperty(PaginationComponent.prototype, "pageNumber", {
        set: function (currentPageNumber) {
            this.currentPageNumber = +currentPageNumber;
            this.pages = this.updatePagesArray(this.currentPageNumber, this.totalNumOfPages);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageSize", {
        set: function (itemsPerPage) {
            this.itemsPerPage = +itemsPerPage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalResults", {
        set: function (totalItems) {
            this.totalItems = +totalItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        set: function (totalNumOfPages) {
            this.totalNumOfPages = +totalNumOfPages;
            this.pages = this.updatePagesArray(this.currentPageNumber, this.totalNumOfPages);
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.selectPage = function (pageNumber) {
        this.onPageChange.emit(pageNumber);
        this.currentPageNumber = pageNumber;
    };
    ;
    PaginationComponent.prototype.updatePagesArray = function (currentPageNumber, totalNumOfPages) {
        var phantomArray = [];
        var startPage, endPage;
        for (var i = 0; i < totalNumOfPages; i++) {
            phantomArray.push(i + 1);
        }
        if (totalNumOfPages <= 5) {
            startPage = 1;
            endPage = totalNumOfPages;
        }
        else {
            if (currentPageNumber <= 3) {
                startPage = 1;
                endPage = 5;
            }
            else if (currentPageNumber + 2 >= totalNumOfPages) {
                startPage = totalNumOfPages - 4;
                endPage = totalNumOfPages;
            }
            else {
                startPage = currentPageNumber - 2;
                endPage = currentPageNumber + 2;
            }
        }
        return phantomArray.slice(startPage - 1, endPage);
    };
    return PaginationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginationComponent.prototype, "pageNumber", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginationComponent.prototype, "pageSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginationComponent.prototype, "totalResults", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], PaginationComponent.prototype, "totalPages", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PaginationComponent.prototype, "onPageChange", void 0);
PaginationComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'pagination',
        providers: [],
        templateUrl: '../templates/pagination.html',
    })
], PaginationComponent);
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map