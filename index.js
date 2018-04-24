console.log('Notification Extension active!')

var actualCode = `

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

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
        };

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
    if (data.growl_type == "is online") {
        Notify_title = data.username + data.growl_type;
    } else if (data.growl_type == "is online on") {
        Notify_title = data.username + data.growl_type + data.growl_game;
    }

    console.log(data.growl_type);


    if (data.growl_type == '') {
        null
    } else {

        chromeNotify(Notify_title, avatar_large, data.growl_text, data.url);
        console.log('Notification Launched');
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

    // add the block to the main growls
    var container = $('body > .user_tray .growls .inner').append(block);

    // update the margin top - 54 + 52 * TOTAL_ITEMS
    container.css('margin-top', -(52 * container.children().length - 12) + 'px');

    // make the block disappear after a while
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
}`;


var script = document.createElement('script');
script.textContent = actualCode;
(document.head).appendChild(script);

