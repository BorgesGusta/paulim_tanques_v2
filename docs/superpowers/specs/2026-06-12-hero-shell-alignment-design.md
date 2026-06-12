# Hero Shell Alignment

## Goal

Align the hero copy and technical form with the same desktop content shell used
by the remaining landing-page sections.

## Layout

- Preserve the full-bleed hero image on the left and the white form surface on
  the right.
- At `lg` and above, constrain the content grid to `max-w-7xl`, center it with
  automatic side margins, and use `48px` horizontal padding.
- The resulting automatic margin is approximately `65.778px` at the reference
  viewport width.
- Keep the existing stacked, full-width mobile layout and its `20px`/`32px`
  responsive padding.

## Implementation

The hero grid becomes the shared shell. Its left image layer extends to the
viewport edge with an absolutely positioned `w-screen` image anchored to the
right edge of the left column. The section background supplies the white
surface to the right, while the copy and form remain inside the centered grid.

## Acceptance

- Hero text and form align with the other `section-shell` content on desktop.
- Desktop horizontal padding is exactly `48px`.
- Full-bleed image and white background remain visually continuous.
- No horizontal overflow appears at `320px`, `375px`, or desktop widths.
