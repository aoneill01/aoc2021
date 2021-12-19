import { getInput } from '../helpers/getInput.js'

export async function part1() {
  const input = await getInput(19)
  // const input = sampleInput
  const scanners = parseInput(input)

  let [matched, ...unmatched] = scanners
  outer: while (unmatched.length > 0) {
    for (const scanner of unmatched) {
      const t = findOverlapTransformation(matched, scanner)
      if (t) {
        console.log('found match')
        matched = combinePoints(matched, scanner, t)
        unmatched = unmatched.filter((s) => s !== scanner)
        continue outer
      }
    }
    console.log('should not get here')
  }
  console.log(matched.length)
}

export async function part2() {
  const input = await getInput(19)
  // const input = sampleInput
  const scanners = parseInput(input)

  let beacons = [{ x: 0, y: 0, z: 0 }]
  let [matched, ...unmatched] = scanners
  outer: while (unmatched.length > 0) {
    for (const scanner of unmatched) {
      const t = findOverlapTransformation(matched, scanner)
      if (t) {
        console.log('found match')
        matched = combinePoints(matched, scanner, t)
        unmatched = unmatched.filter((s) => s !== scanner)
        beacons.push(t({ x: 0, y: 0, z: 0 }))
        continue outer
      }
    }
    console.log('should not get here')
  }

  let maxDistance
  for (let i = 0; i < beacons.length - 1; i++) {
    for (let j = i + 1; j < beacons.length; j++) {
      const d = distance(beacons[i], beacons[j])
      if (maxDistance === undefined || d > maxDistance) maxDistance = d
    }
  }
  console.log(maxDistance)
}

const pointEquals = (pA, pB) => pA.x === pB.x && pA.y === pB.y && pA.z === pB.z

const distance = (pA, pB) => Math.abs(pA.x - pB.x) + Math.abs(pA.y - pB.y) + Math.abs(pA.z - pB.z)

function combinePoints(source, others, transformation) {
  const result = [...source]
  for (const point of others.map(transformation)) {
    if (!result.some((p) => pointEquals(p, point))) {
      result.push(point)
    } else {
      // console.log(point)
    }
  }

  return result
}

function findOverlapTransformation(scannerA, scannerB) {
  for (const orientation of orientationTransformations) {
    for (const aPoint of scannerA) {
      for (const bPoint of scannerB) {
        const transformation = multiTransformation(orientation, deltaTransformation(orientation(bPoint), aPoint))
        const transformedB = scannerB.map(transformation)
        const matchCount = transformedB.filter((b) => scannerA.some((a) => pointEquals(b, a))).length
        if (matchCount >= 12) {
          // console.log(matchCount, transformation({ x: 0, y: 0, z: 0 }))
          return transformation
        }
      }
    }
  }
}

function parseInput(input) {
  const results = []
  let scanner = []
  for (const line of input) {
    if (line === '') {
      results.push(scanner)
      scanner = []
      continue
    }
    if (line.startsWith('---')) continue
    const [x, y, z] = line.split(',')
    scanner.push({ x: +x, y: +y, z: +z })
  }
  if (scanner.length > 0) {
    results.push(scanner)
  }
  return results
}

function multiTransformation(t1, t2) {
  return (point) => t2(t1(point))
}

function deltaTransformation(from, to) {
  return transformation(
    (point) => point.x + (to.x - from.x),
    (point) => point.y + (to.y - from.y),
    (point) => point.z + (to.z - from.z)
  )
}

const posX = (point) => point.x
const negX = (point) => -point.x
const posY = (point) => point.y
const negY = (point) => -point.y
const posZ = (point) => point.z
const negZ = (point) => -point.z

function transformation(getX, getY, getZ) {
  return (point) => ({ x: getX(point), y: getY(point), z: getZ(point) })
}

const orientationTransformations = [
  transformation(posX, posY, posZ),
  transformation(posZ, posY, negX),
  transformation(negX, posY, negZ),
  transformation(negZ, posY, posX),
  transformation(posX, negY, negZ),
  transformation(negZ, negY, negX),
  transformation(negX, negY, posZ),
  transformation(posZ, negY, posX),

  transformation(posY, posZ, posX),
  transformation(posY, negX, posZ),
  transformation(posY, negZ, negX),
  transformation(posY, posX, negZ),
  transformation(negY, negZ, posX),
  transformation(negY, negX, negZ),
  transformation(negY, posZ, negX),
  transformation(negY, posX, posZ),

  transformation(posZ, posX, posY),
  transformation(negX, posZ, posY),
  transformation(negZ, negX, posY),
  transformation(posX, negZ, posY),
  transformation(negZ, posX, negY),
  transformation(negX, negZ, negY),
  transformation(posZ, negX, negY),
  transformation(posX, posZ, negY),
]

const sampleInput = `--- scanner 0 ---
404,-588,-901
528,-643,409
-838,591,734
390,-675,-793
-537,-823,-458
-485,-357,347
-345,-311,381
-661,-816,-575
-876,649,763
-618,-824,-621
553,345,-567
474,580,667
-447,-329,318
-584,868,-557
544,-627,-890
564,392,-477
455,729,728
-892,524,684
-689,845,-530
423,-701,434
7,-33,-71
630,319,-379
443,580,662
-789,900,-551
459,-707,401

--- scanner 1 ---
686,422,578
605,423,415
515,917,-361
-336,658,858
95,138,22
-476,619,847
-340,-569,-846
567,-361,727
-460,603,-452
669,-402,600
729,430,532
-500,-761,534
-322,571,750
-466,-666,-811
-429,-592,574
-355,545,-477
703,-491,-529
-328,-685,520
413,935,-424
-391,539,-444
586,-435,557
-364,-763,-893
807,-499,-711
755,-354,-619
553,889,-390

--- scanner 2 ---
649,640,665
682,-795,504
-784,533,-524
-644,584,-595
-588,-843,648
-30,6,44
-674,560,763
500,723,-460
609,671,-379
-555,-800,653
-675,-892,-343
697,-426,-610
578,704,681
493,664,-388
-671,-858,530
-667,343,800
571,-461,-707
-138,-166,112
-889,563,-600
646,-828,498
640,759,510
-630,509,768
-681,-892,-333
673,-379,-804
-742,-814,-386
577,-820,562

--- scanner 3 ---
-589,542,597
605,-692,669
-500,565,-823
-660,373,557
-458,-679,-417
-488,449,543
-626,468,-788
338,-750,-386
528,-832,-391
562,-778,733
-938,-730,414
543,643,-506
-524,371,-870
407,773,750
-104,29,83
378,-903,-323
-778,-728,485
426,699,580
-438,-605,-362
-469,-447,-387
509,732,623
647,635,-688
-868,-804,481
614,-800,639
595,780,-596

--- scanner 4 ---
727,592,562
-293,-554,779
441,611,-461
-714,465,-776
-743,427,-804
-660,-479,-426
832,-632,460
927,-485,-438
408,393,-506
466,436,-512
110,16,151
-258,-428,682
-393,719,612
-211,-452,876
808,-476,-593
-575,615,604
-485,667,467
-680,325,-822
-627,-443,-432
872,-547,-609
833,512,582
807,604,487
839,-516,451
891,-625,532
-652,-548,-490
30,-46,-14`.split('\n')
