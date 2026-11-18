import { describe, expect, test } from "bun:test";

import { getCourseThumbnailMediaDirectory } from "../services/media/media.ts";

describe("getCourseThumbnailMediaDirectory", () => {
  test("versions MP4 thumbnail URLs for Safari byte-range delivery", () => {
    const url = getCourseThumbnailMediaDirectory("org_asv", "course_asv", "intro.MP4");
    expect(url).toContain("/content/orgs/org_asv/courses/course_asv/thumbnails/intro.MP4");
    expect(url).toEndWith("?asv-range-v=2");
  });

  test("does not add the video delivery version to still images", () => {
    const url = getCourseThumbnailMediaDirectory("org_asv", "course_asv", "cover.png");
    expect(url).toContain("/content/orgs/org_asv/courses/course_asv/thumbnails/cover.png");
    expect(url).not.toContain("asv-range-v");
  });
});
