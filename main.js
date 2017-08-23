$(document).ready(function() {
    var moves = [];
    var sequence = [];
    var sounds = {
        green: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
        red: 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
        yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
        blue: 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    };
    var start = false;
    var strict = false;
    var turn = false;

    function playSound(color) {
        var audio = document.createElement('audio');
        audio.src = sounds[color];
        audio.play();
    }

    function toggleStrict() {
        if (!strict) {
            $('#strict').addClass('selected');
            strict = true;
        }
        else {
            $('#strict').removeClass('selected');
            strict = false;
        }
    }

    function timedLoop(func, ms, sequence, index) {
        if (index !== sequence.length) {
            setTimeout(function() {
                func(sequence[index]);
                timedLoop(func, ms, sequence, index+1);
            }, ms);
        }
        else {
            turn = true;
        }
    }

    function randColor() {
        switch(Math.floor(Math.random() * 4)) {
            case 0:
                return "green";
            case 1:
                return "red";
            case 2:
                return "yellow";
            case 3:
                return "blue";
        }
    }

    function flash(color) {
        var circle = $('#' + color).addClass(color);
        playSound(color);
        setTimeout(function() {
            circle.removeClass(color);
        }, 500);
    }

    function show(sequence) {
        turn = false;
        $('.screen').text(sequence.length);
        timedLoop(flash, 1000, sequence, 0);
    }

    $('#start').click(function(event) {
        if (!start) {
            start = true;
            sequence.push(randColor());                
            show(sequence);
        }
        else {
            sequence = [];
            moves = [];
            turn = false;
            sequence.push(randColor());
            show(sequence);
        }
    });

    $('.btn-color').mousedown(function(event) {
        if (start && turn) {
            var id = event.target.id;
            playSound(id);
            $('#' + id).addClass(id);
            $('.btn-color').mouseup(function(event) {
                $('#' + id).removeClass(id);
            });
        }
    });

    $('.btn-color').click(function(event) {
        if (turn) {
            var id = event.target.id;
            moves.push(id);
            if (!(moves[moves.length-1] === sequence[moves.length-1])) {
                turn = false;
                moves = []
                $('.screen').text('!!!');
                if (strict) {
                    sequence = [];
                    setTimeout(function() {
                        sequence.push(randColor());                
                        show(sequence);
                    }, 2500);
                }
                else {
                    setTimeout(function() {
                        show(sequence);
                    }, 2500);
                }
            }
            else if (moves.length === sequence.length) {
                if (sequence.length === 20) {
                    setTimeout(function() {
                        alert("Congratulation, you win!");
                        sequence = [];
                        moves = [];
                        turn = false;
                        sequence.push(randColor());
                        show(sequence);
                    }, 1);
                }
                else {
                    moves = [];
                    sequence.push(randColor());                
                    show(sequence);
                }
            }
        }
    });

    $('#strict').click(toggleStrict)
    

});
