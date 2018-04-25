
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

var i = 0;

function chromeNotify(title, icon_img, body_msg, link) {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }

    if (Notification.permission !== "granted")
        Notification.requestPermission();
    else {
        var notification = new Notification(title, {
            icon: icon_img,
            body: body_msg,
        });

        notification.onclick = function () {
            window.open(link);
            notification.close();
        };

        setTimeout(function () {
            notification.close()
        }, 5000);
    }
}


Enjin_Core.Notifications.addGrowl = function (data) {
    if ('' == data.growl_class) {
        console.log(data);
        return;
    }

    //Google Chrome Notification - Made By rojo8399 - Version 1.2

    //fix avatar size
    var avatar_large = (data.avatar).replace("small", "avatar");

    var Notify_title = data.growl_type;

    


    // If the type is empty or undefined, do not pop a notification
    if (data.growl_type == '') {
        null;

    // Logs used for debugging
    // console.log("Type: " + data.growl_type);
    // console.log("Class: " + data.growl_class);
    // console.log("Text: " + data.growl_text);
    // console.log("Game: " + data.growl_game);

    } else if (data.growl_type == undefined) {

        Notify_title = "Wall post:"
        chromeNotify(Notify_title, avatar_large, data.growl_text, data.url);

    } 
    
    else {
        chromeNotify(Notify_title, avatar_large, data.growl_text, data.url);
        // console.log('Notification Launched');
        // console.log("Type: " + data.growl_type);
        // console.log("Class: " + data.growl_class);
        // console.log("Text: " + data.growl_text);
        // console.log("Game: " + data.growl_game);
    }


    //Setup growl - (Defaults by Enjin)
    var block = $('body > .user_tray .growls .template .growl').clone();
    block.attr('href', data.url);
    block.addClass(Enjin_Core.filterOutput(data.growl_class));
    block.find('.growl_avatar').attr('src', data.avatar);
    block.find('.growl_username').html(data.username);

    data.growl_type ? block.find('.growl_type').html(Enjin_Core.filterOutput(data.growl_type)).show() : null;
    data.growl_text ? block.find('.growl_text').html(Enjin_Core.Notifications.stylizeContent(Enjin_Core.teaser(data.growl_text, 45))).show() : null;
    data.growl_game ? block.find('.growl_game').html(Enjin_Core.filterOutput(data.growl_game)).show() : null;

    // Add the block to the main growls
    var container = $('body > .user_tray .growls .inner').append(block);

    // Update the margin top - 54 + 52 * TOTAL_ITEMS
    container.css('margin-top', -(52 * container.children().length - 12) + 'px');

    //
    block.mouseenter(function () {
        $(this).addClass('over');
    }).mouseleave(function () {
        $(this).removeClass('over');
    });
    setTimeout(function () {
        if (false === block.hasClass('over')) {
            block.slideUp(300, function () {
                $(this).remove();
            });
        } else {
            var onTime = arguments.callee;
            block.mouseleave(function () {
                setTimeout(onTime, 1600);
            });
        }
    }, 5500);

}