import * as THREE from 'three'

const basesRegex = /^([+-][x-z])([+-][x-z])([+-][x-z])$/iu
const nameToIndex = { x: 0, y: 1, z: 2 } as const
const orderedVectors = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] as const

const stringToAxes = (axes: string) => {
  return axes.toLowerCase().match(basesRegex)!.splice(1, 3)
    .map((axis) => {
      const negative = axis.startsWith('-')
      const name = axis[1] as 'x' | 'y' | 'z'
      return { name, negative }
    })
}

export const getBasisTransform = (from: string, to: string, targetMatrix: THREE.Matrix4): void => {
  const fromAxes = stringToAxes(from)
  const toAxes = stringToAxes(to)

  for (let index: 0 | 1 | 2 = 0; index < 3; index += 1) {
    const fromAxis = fromAxes[index]!
    const toAxis = toAxes[index]!

    const fromIndex = nameToIndex[fromAxis.name]
    const equalNegative = fromAxis.negative === toAxis.negative

    const vector = orderedVectors[fromIndex]
    vector.set(0, 0, 0)
    vector[toAxis.name] = equalNegative ? 1 : -1
  }

  targetMatrix.makeBasis(orderedVectors[0], orderedVectors[1], orderedVectors[2])
}