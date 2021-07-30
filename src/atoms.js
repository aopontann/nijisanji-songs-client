import { atom, selector } from "recoil";

export const videoListState = atom({
  key: "videoListState",
  default: []
});

export const searchValueState = atom({
  key: "searchValueState",
  default: ""
});

export const searchCheckBoxState = atom({
  key: "searchCheckBoxState",
  default: true
});

export const dialogOpenState = atom({
  key: "dialogOpenState",
  default: false
});

export const dialogVideoIdState = atom({
  key: "dialogVideoIdState",
  default: ""
});

export const dialogTagsState = atom({
  key: "dialogTagsState",
  default: []
});

export const saveTagsState = atom({
  key: "saveTagsState",
  default: "ready"
});
