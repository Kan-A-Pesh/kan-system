export enum Direction {
  None = 0,
  Left = 1 << 0,
  Right = 1 << 1,
  Up = 1 << 2,
  Down = 1 << 3,

  LeftUp = Direction.Left | Direction.Up,
  LeftDown = Direction.Left | Direction.Down,
  RightUp = Direction.Right | Direction.Up,
  RightDown = Direction.Right | Direction.Down,

  Horizontal = Left | Right,
  Vertical = Up | Down,

  All = Horizontal | Vertical
}
