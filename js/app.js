$(function(){
    $.getJSON("categories.json", function(data){
        $.each(data, function(index, item){
            if (item.category.is_default === false){
                category_dom = $("<div class='panel-body'></div>");
                if(item.category.folders){      
                    folders_dom = $("<ul class='list-inline pull-right'></ul>");
                    $.each(item.category.folders, function(index, some_folder){
                        var anchor_dom = $("<a class='btn btn-default'></a>");
                        anchor_dom.attr("href", "https://picovico.freshdesk.com/support/solutions/folders/" + some_folder.id);
                        anchor_dom.append(some_folder.name);
                        var li_dom = $("<li></li>");
                        li_dom.append(anchor_dom);
                        folders_dom.append(li_dom);
                    });
                    category_dom.append(folders_dom);
                }
                var anchor_dom = $("<h4><a></a></h4>");
                anchor_dom.find("a").attr("href", "https://picovico.freshdesk.com/support/solutions/" + item.category.id);
                anchor_dom.find("a").append(item.category.name);


                category_dom.append(anchor_dom);
                category_dom.append(item.category.description );

                var panel_dom = $("<div class='panel panel-default'></div>");
                panel_dom.append(category_dom);

                $("#fd-categories").append(panel_dom);
            }
        });
    });
});