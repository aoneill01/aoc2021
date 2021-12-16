import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = (await getInput(16))[0]
  // const input = sampleInput7
  const result = readPacket(input, 0)
  // console.log(JSON.stringify(result, null, 2))
  console.log(sumVersionNumbers(result))
}

export async function part2() {
  // const input = (await getInput(16))[0]
  const input = sampleInput8
  const result = readPacket(input, 0)
  console.log(JSON.stringify(result, null, 2))
  console.log(evaluatePacket(result))
}

function sumVersionNumbers(packet) {
  let result = packet.packet.version

  for (const subPacket of packet.packet.subPackets ?? []) {
    result += sumVersionNumbers(subPacket)
  }

  return result
}

function evaluatePacket(packet) {
  switch (packet.packet.typeId) {
    case 0: {
      return packet.packet.subPackets.reduce((sum, p) => sum + evaluatePacket(p), 0)
    }
    case 1: {
      return packet.packet.subPackets.reduce((sum, p) => sum * evaluatePacket(p), 1)
    }
    case 2: {
      return Math.min(...packet.packet.subPackets.map(evaluatePacket))
    }
    case 3: {
      return Math.max(...packet.packet.subPackets.map(evaluatePacket))
    }
    case 4: {
      return packet.packet.value
    }
    case 5: {
      const lhs = evaluatePacket(packet.packet.subPackets[0])
      const rhs = evaluatePacket(packet.packet.subPackets[1])
      return lhs > rhs ? 1 : 0
    }
    case 6: {
      const lhs = evaluatePacket(packet.packet.subPackets[0])
      const rhs = evaluatePacket(packet.packet.subPackets[1])
      return lhs < rhs ? 1 : 0
    }
    case 7: {
      const lhs = evaluatePacket(packet.packet.subPackets[0])
      const rhs = evaluatePacket(packet.packet.subPackets[1])
      return lhs === rhs ? 1 : 0
    }
  }
}

function readPacket(hex, position) {
  const version = readBits(hex, position, 3)
  const typeId = readBits(hex, position + 3, 3)
  if (typeId === 4) {
    let num = 0
    let p = position + 6
    for (let p = position + 6; ; p += 5) {
      const next = readBits(hex, p, 5)
      console.log(next.toString(2), p)
      num <<= 4
      num += next & 0b1111
      if ((next & 0b10000) === 0) {
        return {
          start: position,
          end: p + 5,
          packet: {
            version,
            typeId,
            value: num,
          },
        }
      }
    }
  } else {
    const i = readBits(hex, position + 6, 1)
    switch (i) {
      case 0: {
        const length = readBits(hex, position + 7, 15)
        const subPackets = []
        let p = position + 22
        const finalPosition = p + length
        while (p < finalPosition) {
          const next = readPacket(hex, p)
          subPackets.push(next)
          p = next.end
        }

        return {
          start: position,
          end: finalPosition,
          packet: {
            version,
            typeId,
            i,
            length,
            subPackets,
          },
        }
      }
      case 1: {
        const length = readBits(hex, position + 7, 11)
        const subPackets = []
        let p = position + 18
        for (let j = 0; j < length; j++) {
          const next = readPacket(hex, p)
          subPackets.push(next)
          p = next.end
        }

        return {
          start: position,
          end: p,
          packet: {
            version,
            typeId,
            i,
            length,
            subPackets,
          },
        }
      }
    }
  }
}

function readBits(hex, position, length) {
  const first = Math.floor(position / 4)
  const last = Math.floor((position + length) / 4)
  let decimal = parseInt(hex.substring(first, last + 1), 16)
  decimal >>>= 4 - ((position + length) % 4)
  let mask = 0
  for (let i = 0; i < length; i++) {
    mask <<= 1
    mask += 1
  }
  return decimal & mask
}

const sampleInput1 = 'D2FE28'
const sampleInput2 = '38006F45291200'
const sampleInput3 = 'EE00D40C823060'
const sampleInput4 = '8A004A801A8002F478'
const sampleInput5 = '620080001611562C8802118E34'
const sampleInput6 = 'C0015000016115A2E0802F182340'
const sampleInput7 = 'A0016C880162017C3686B18A3D4780'
const sampleInput8 = 'C200B40A82'
