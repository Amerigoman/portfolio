(function() {
  var app = angular.module('gemStore', ['store-directives']);

  app.controller('StoreController', ['$http', function($http){
    var store = this;
    store.products = [];
    
    $http.get('store-products.json').success(function(data) {
      store.products = data;
    });    
  }]);

  app.controller("ReviewController", function($http){
    this.review = {};

    this.addReview = function(product){
      this.review.createdOn = Date.now();
      product.reviews.push(this.review);
      this.review = {};
    };

    this.saveReview = function(review) {
      $http({method: 'POST', url: 'store-products.json', data: review});
    };
  });
})();
