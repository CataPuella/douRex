var pref = widget.preferences;
$('#skin').change(function(e) {
    console.log(this.value);
    pref.skin = this.value;
});
