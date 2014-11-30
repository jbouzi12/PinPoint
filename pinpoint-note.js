PinPoint.Note = function(){
  this.noteTime = "";
  this.timeUrl = "";
  this.websiteUrl = "";
  this.noteContent = document.getElementById('content').value;
  this.storageKey = ""
}

PinPoint.Note.prototype.assignURL = function(){
  this.websiteUrl = localStorage.url;
};

PinPoint.Note.prototype.assignTime = function(){
  this.noteTime = localStorage.time;
};

PinPoint.Note.prototype.formatTimeUrl = function(){
  var formattedTime = ""
  if (this.noteTime.length > 5){
    formattedTime = this.noteTime.replace(":", "h").replace(":", "m").concat("s")
    var formattedUrl = this.websiteUrl + "&t=" + formattedTime;
  } else {
    formattedTime = this.noteTime.replace(":", "m").concat("s")
    var formattedUrl = this.websiteUrl + "&t=" + formattedTime;
  }
  localStorage["timeUrl"] = formattedUrl;
};

PinPoint.Note.prototype.assignTimeUrl = function(){
  this.timeUrl  = localStorage.timeUrl;
};

PinPoint.Note.prototype.assignStorageKey = function(){
    console.log(this);
  this.storageKey = this.websiteUrl + "/" + Date.now();
};


