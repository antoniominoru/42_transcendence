import * as THREE from "../three/three.module.js";

export default class Ball extends THREE.Mesh {
  constructor({
    radius = 2,
    color = "#ffff00",
    speed = 0.25,
    position = {
      x: 0,
      y: 0,
      z: 0,
    },
  }) {
    super(
      new THREE.SphereGeometry(radius),
      new THREE.MeshBasicMaterial({ color }),
    );

    this.radius = radius;

    this.position.set(position.x, position.y, position.z);

    this.speed = speed;

    this.velocity = {
      x: this.speed,
      y: 0,
      z: this.speed,
    };
  }

  update(arena, paddleL, paddleR) {
    const nextPos = {
      x: this.position.x + this.velocity.x,
      z: this.position.z + this.velocity.z,
    };
    if (this.checkWallHCollision(arena, nextPos)) {
      this.velocity.z *= -1;
    } else if (this.checkWallVCollision(arena, nextPos)) {
      this.velocity.x *= -1;
    } else if (this.checkPaddleColision(paddleL, nextPos)) {
      paddleL.canCollideWithBall = false;
      paddleR.canCollideWithBall = true;
      this.updateVelocity(nextPos.z, paddleL);
    } else if (this.checkPaddleColision(paddleR, nextPos)) {
      paddleR.canCollideWithBall = false;
      paddleL.canCollideWithBall = true;
      this.updateVelocity(nextPos.z, paddleR);
    }
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
  }

  checkWallHCollision(arena, nextPos) {
    if (nextPos.z - this.radius <= arena.topSide) return true;
    else if (nextPos.z + this.radius >= arena.bottomSide) return true;
    return false;
  }

  checkWallVCollision(arena, nextPos) {
    if (nextPos.x + this.radius >= arena.rightSide) return true;
    else if (nextPos.x - this.radius <= arena.leftSide) return true;
    return false;
  }

  checkPaddleColision(paddle, nextPos) {
    if (paddle.canCollideWithBall == false) return false;
    else if (
      nextPos.x + this.radius >= paddle.leftSide &&
      nextPos.x - this.radius <= paddle.rightSide
    ) {
      if (
        nextPos.z - this.radius <= paddle.bottomSide &&
        nextPos.z + this.radius >= paddle.topSide
      ) {
        return true;
      }
    }
    return false;
  }

  updateVelocity(intersectZ, paddle) {
    const relativeDelta = intersectZ - paddle.position.z;
    const normalizedDelta = relativeDelta / (paddle.depth / 2);
    const maxBounceAngle = Math.PI / 4;
    const bounceAngle = normalizedDelta * maxBounceAngle;
    const currentSpeed = this.checkPaddleSideCollision(paddle)
      ? this.speed * 1.35
      : this.speed;
    this.velocity.x =
      Math.sign(this.velocity.x) * -Math.cos(bounceAngle) * currentSpeed;
    this.velocity.z = Math.sin(bounceAngle) * currentSpeed;
  }

  checkPaddleSideCollision(paddle) {
    if (
      this.position.z <= paddle.topSide ||
      this.position.z >= paddle.bottomSide
    )
      return true;
  }
}
