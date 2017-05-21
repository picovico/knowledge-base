// $(function(){
//     $.getJSON("categories.json", function(data){
//         $.each(data, function(index, item){
//             console.log(item);
//             // if (item.category.is_default === false){
//                 category_dom = $("<div class='panel-body'></div>");
//                 if(item.category.folders){      
//                     folders_dom = $("<ul class='list-inline pull-right'></ul>");
//                     $.each(item.category.folders, function(index, some_folder){
//                         var anchor_dom = $("<a class='btn btn-default'></a>");
//                         anchor_dom.attr("href", "https://picovico.freshdesk.com/support/solutions/folders/" + some_folder.id);
//                         anchor_dom.append(some_folder.name);
//                         var li_dom = $("<li></li>");
//                         li_dom.append(anchor_dom);
//                         folders_dom.append(li_dom);
//                     });
//                     category_dom.append(folders_dom);
//                 }
//                 var anchor_dom = $("<h4><a></a></h4>");
//                 anchor_dom.find("a").attr("href", "https://picovico.freshdesk.com/support/solutions/" + item.category.id);
//                 anchor_dom.find("a").append(item.category.name);


//                 category_dom.append(anchor_dom);
//                 category_dom.append(item.category.description );

//                 var panel_dom = $("<div class='panel panel-default'></div>");
//                 panel_dom.append(category_dom);

//                 $("#fd-categories").append(panel_dom);
//             // }
//         });
//     });
// });

function handle_category_click(self, data){
    // $(self).parent().parent().append("<hr />");
    var container = $("<div class='list-group folders content' style='display:none'></div>");
    $.each(data, function(index, item){
        var anchor_dom = $("<a href='javascript:void()' class='folder api' data-parent=2></a>");
        anchor_dom.attr("data-id", item.id);
        anchor_dom.attr("data-handler", "folder");
        anchor_dom.attr("data-api", "solutions/folders/" + item.id + "/articles")
        anchor_dom.append(item.name);
        var heading_dom = $("<h4></h4>");
        heading_dom.append(anchor_dom);
        var li_dom = $("<div class='list-group-item'></div>");
        li_dom.append(heading_dom);
        container.append(li_dom);        
    }) ;          
    $(self).parent().parent().parent().append(container);
    $(self).parent().parent().parent().find(".folders").fadeIn();
}

function handle_folder_click(self, data){
    var panel = $("<div class='panel content'><div class='panel-body'></div></div>");
    var container = $("<div class='list-group articles' style='display:none'></div>");
    $.each(data, function(index, item){
        var anchor_dom = $("<a href='javascript:void()' class='article api' data-parent=2></a>");
        anchor_dom.attr("data-id", item.id);
        anchor_dom.attr("data-handler", "article");
        anchor_dom.attr("data-api", "solutions/articles/" + item.id );
        anchor_dom.append(item.title);
        var h_dom = $("<h5></h5>");
        h_dom.append(anchor_dom);
        var li_dom = $("<div class='list-group-item'></div>");
        li_dom.append(h_dom);
        container.append(li_dom);        
    }) ;          
    panel.append(container);
    $(self).parent().parent().append(panel);
    $(self).parent().parent().find(".articles").fadeIn();
}

function handle_article_click(self, data){
    var panel = $("<p class='article content'></p>");
    panel.append("<strong> Answer : </strong> <br /> " + data.description);
    $(self).parent().parent().append(panel);
    // $(self).parent().parent().find(".articles").fadeIn();
}

$(function(){
    $("#fd-categories").on("click", "a.api", function(event){
        event.preventDefault();
        var self = this;
        var api = $(this).data("api");
        var handler = $(self).data("handler") ;
        if($(this).data("expanded")){
            var p_levels = parseInt($(this).data('parent'));
            var p = $(this);
            for(var i = 0; i < p_levels; i++){
                p = p.parent();
            }
            p.find("> .content").toggle();
            return;
        }

        $(this).data("expanded", true);

        $.getJSON("api_cache/" + api + "/response.json", function(data){
            var handler_fn = "handle_" + handler + "_click";
            window[handler_fn](self, data);
        });
        return false;
    });
});


$(function(){
    $.getJSON("api_cache/solutions/categories/response.json", function(data){
        $.each(data, function(index, item){
            category_dom = $("<div class='panel-body'></div>");

            var anchor_dom = $("<h3><a class='category api' data-parent=3></a></h3>");
            anchor_dom.find("a").attr("href", "#");
            anchor_dom.find("a").attr("data-handler", "category");
            anchor_dom.find("a").attr("data-category-id", item.id);
            anchor_dom.find("a").attr("data-api", "solutions/categories/" + item.id + "/folders");
            anchor_dom.find("a").append(item.name);

            category_dom.append(anchor_dom);
            category_dom.append(item.description );

            var panel_dom = $("<div class='panel panel-default'></div>");
            panel_dom.append(category_dom);

            $("#fd-categories").append(panel_dom);
        });
    });
});
