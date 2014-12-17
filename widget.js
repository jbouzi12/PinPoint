var PinPoint = PinPoint || {};


PinPoint.Widget = function(video){
	this.video = video;
	this.videoParent = document.querySelector("video").parentNode
	this.videoParent.addEventListener('mouseenter', function(event){
		this.drawSideBar()
	}.bind(this));
	this.videoParent.addEventListener('mouseleave', function(event){
		if (event.fromElement === this.videoParent && event.toElement != this.sideBar) {
			this.destroySideBar()
		}
	}.bind(this));
}

PinPoint.Widget.prototype = {
	onSideBarClick: function(event){
		event.stopPropagation();
	},

	drawSideBar: function(){
		if (!this.sideBar) {
			this.sideBar = document.createElement("div");
      this.sideBar.setAttribute("class", "pinpoint-sideBar");
			this.sideBar.addEventListener('click', this.onSideBarClick.bind(this));
			this.sideBar.style.display = "block";
			this.sideBar.style.position = "absolute";
			this.sideBar.style.top = this.videoParent.offsetTop + "px";
			this.sideBar.style.left = this.videoParent.offsetLeft + "px";
			this.sideBar.style.backgroundColor = "rgb(37,37,37)";
			this.sideBar.style.zIndex = 5e6;
			this.video.offsetParent.appendChild(this.sideBar);
			this.drawForm();
			this.drawTable();
			this.appendNotes();
		}
	},

	destroySideBar: function(){
		this.sideBar.parentNode.removeChild(this.sideBar);
		this.sideBar = null
	},

	drawForm: function(){
		this.form = document.createElement("form");
		this.form.setAttribute('class',"pinpoint-add-note");
		this.form.addEventListener('submit', this.createNote.bind(this));

		this.input = document.createElement("input");
		this.input.setAttribute('type', 'text');
		this.input.setAttribute('placeholder', 'Create a PinPoint here...')
		this.input.setAttribute('class', 'pinpoint-note-input')
		// Stops youtube keyboard shortcuts from interfering when typing a comment.
		this.input.addEventListener('keypress', function(event){
			event.stopPropagation();
		})

		this.submit = document.createElement("input");
		this.submit.setAttribute('type',"submit");

		this.submit.setAttribute('class',"pinpoint-save");
		this.submit.setAttribute('value',"Save note");


		this.form.appendChild(this.input);
		this.form.appendChild(this.submit);
		this.sideBar.appendChild(this.form);
	},

	drawTable: function() {
		this.tableContainer = document.createElement("div");
		this.tableContainer.setAttribute('class', "pinpoint-notes-container");
		this.sideBar.appendChild(this.tableContainer);
	},

	drawNotes: function(note, index, url, refreshFunc) {
		var noteNode = document.createElement("div");
		var timeAndDelteNode = document.createElement("div");
		var timeLink = document.createElement("a");
		var deleteLink = document.createElement("button");
		var contentNode = document.createElement("div");
		var contentLink = document.createElement("a");



	}

	createNote: function(event){
    event.preventDefault();
		var noteContentFromForm = this.input.value;
    var time = document.getElementsByClassName('ytp-time-current')[0].innerHTML
    var note = {
      title: document.title,
      noteTime: time,
      content: noteContentFromForm,
      seconds: this.video.currentTime,
      url: this.getUrl()
    };
    chrome.runtime.sendMessage({
    	method: "add note",
    	url: this.getUrl(),
    	note: note
    }, this.appendNotes.bind(this));
    this.input.value = "";
	},

	displayNotes: function(notes){
		this.notes = notes
	},

	appendNotes: function(callback){
		chrome.runtime.sendMessage({ url: this.getUrl() }, function(notes){
	    notes.sort(function(a,b) { return a.seconds - b.seconds } );
	  	this.tableContainer.innerHTML = ""
			var index = 0;
			for (note of notes) {
				// NOTE PRESENTER HERE!!!!!!!!!!! 
		  	var node = new PinPoint.NotePresenter(
		  		note,
		  		index,
		  		this.getUrl(),
		  		this.appendNotes.bind(this)).present();
		  	index++;
		 		this.tableContainer.appendChild(node);
			}
		}.bind(this))
	},

	getUrl: function(){
		if (this.video.dataset.youtubeId){
			var url = new URL("https://www.youtube.com/watch")
			url.search = "v=" + this.video.dataset.youtubeId
			return url.toString()
		} else {
			return this.video.src
		}
	},
}

function main(){
	var videos = document.querySelectorAll("video");
	for (var i = 0; i < videos.length; i++){
		videos[i].pinPointWidget = videos[i].pinPointWidget || new PinPoint.Widget(videos[i]);
	}
}

window.addEventListener('DOMNodeInserted', function(){
	main();
});
