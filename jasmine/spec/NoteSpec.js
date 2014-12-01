describe("Note", function(){
  beforeEach(function() {
    note = new PinPoint.Note();
    localStorage["time"] = "0:30"
    localStorage["url"] = "http://www.youtube.com/12i3t47grfi"
  });

  it("should be defined.", function(){
    expect(note).toBeDefined();
  });

  describe("#assignURL", function(){
    it("should assign note's websiteUrl attribute to new url.", function(){
      note.assignURL();
      expect(note.websiteUrl).not.toEqual("");
      expect(note.websiteUrl).not.toEqual(undefined);
      expect(note.websiteUrl).not.toEqual(null);
    });
  });
});
