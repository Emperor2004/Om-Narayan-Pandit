"use client";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { skillCategories } from "@/data";

type Skill = {
  name: string;
  category: string;
  proficiency: number; // 0 to 1
  originalIndex: number; // to maintain order
};

// Extract all skills from skillCategories with a proficiency score
const extractSkills = (): Skill[] => {
  const skills: Skill[] = [];
  skillCategories.forEach((category) => {
    category.skills.forEach((skillName, skillIndex) => {
      // Assign a proficiency based on category - could be made more sophisticated
      let proficiency = 0.7; // default
      switch (category.name) {
        case "ML / DL Frameworks":
          proficiency = 0.85;
          break;
        case "Computer Vision & NLP":
          proficiency = 0.8;
          break;
        case "Reinforcement Learning":
          proficiency = 0.75;
          break;
        case "Languages & Tools":
          proficiency = 0.9;
          break;
        case "Data & Visualization":
          proficiency = 0.8;
          break;
        case "Research & Gen AI":
          proficiency = 0.7;
          break;
      }
      skills.push({
        name: skillName,
        category: category.name,
        proficiency,
        originalIndex: skillIndex,
      });
    });
  });
  return skills;
};

const skillsData: Skill[] = extractSkills();

// Function to generate points in orbital rings
function pointsInOrbitalRings(skills: Skill[]) {
  const points: THREE.Vector3[] = [];
  
  // Group skills by category
  const skillsByCategory: Record<string, Skill[]> = {};
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  // Define orbital rings for each category
  const categoryOrder = [
    "ML / DL Frameworks",
    "Computer Vision & NLP", 
    "Reinforcement Learning",
    "Languages & Tools",
    "Data & Visualization",
    "Research & Gen AI"
  ];
  
  const ringRadius = 1.2;
  const ringHeight = 0.3;
  
  categoryOrder.forEach((category, ringIndex) => {
    const categorySkills = skillsByCategory[category] || [];
    if (categorySkills.length === 0) return;
    
    // Distribute skills evenly in this ring
    const angleIncrement = (2 * Math.PI) / categorySkills.length;
    
    categorySkills.forEach((skill, skillIndex) => {
      const angle = skillIndex * angleIncrement;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;
      // Alternate rings above and below plane for 3D effect
      const y = (ringIndex % 2 === 0 ? ringHeight : -ringHeight) * 0.5;
      
      points.push(new THREE.Vector3(x, y, z));
    });
  });
  
  return points;
}

export function SkillConstellation() {
  const constellationRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<Map<string, THREE.Mesh>>(new Map());
  const connectorRefs = useRef<Map<string, THREE.Line>>(new Map());

  // Generate points for skills in orbital rings
  const pointsData = useRef<THREE.Vector3[]>(pointsInOrbitalRings(skillsData));

  // We'll create a group for the constellation and add nodes and connectors
  useEffect(() => {
    if (!constellationRef.current) return;

    // Clear existing nodes and connectors
    constellationRef.current.clear();
    nodeRefs.current.clear();
    connectorRefs.current.clear();

    // Add skill nodes
    skillsData.forEach((skill, index) => {
      const point = pointsData.current[index];
      if (!point || !constellationRef.current) return;

      // Create a sphere for the skill
      const geometry = new THREE.SphereGeometry(0.04 + skill.proficiency * 0.06, 12, 12);
      
      // Color based on category
      let color = 0x6366f1; // default accent
      switch (skill.category) {
        case "ML / DL Frameworks":
          color = 0x6366f1; // indigo
          break;
        case "Computer Vision & NLP":
          color = 0x22d3ee; // cyan
          break;
        case "Reinforcement Learning":
          color = 0xf472b6; // pink
          break;
        case "Languages & Tools":
          color = 0x10b981; // emerald
          break;
        case "Data & Visualization":
          color = 0x8b5cf6; // violet
          break;
        case "Research & Gen AI":
          color = 0xf59e0b; // amber
          break;
        default:
          color = 0x6366f1;
      }
      
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7,
      });
      
      const node = new THREE.Mesh(geometry, material);
      node.position.copy(point);
      node.userData = { skill, index };
      constellationRef.current.add(node);
      nodeRefs.current.set(skill.name, node);
    });

    // Add connectors between related skills (simplified - connect skills within same category)
    // Group skills by category for connector creation
    const skillsByCategory: Record<string, Skill[]> = {};
    skillsData.forEach(skill => {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill);
    });

    // Create connectors within each category
    Object.values(skillsByCategory).forEach(categorySkills => {
      if (categorySkills.length < 2 || !constellationRef.current) return;
      
      // Create a line connecting all skills in this category
      const points = categorySkills.map(skill => {
        const point = pointsData.current[skillsData.findIndex(s => s.name === skill.name)];
        return point ? point.clone() : new THREE.Vector3(0, 0, 0);
      }).filter(p => p.length() > 0); // Filter out invalid points
      
      if (points.length >= 2 && constellationRef.current) {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
          color: 0x6366f1, 
          transparent: true,
          opacity: 0.2
        });
        
        const line = new THREE.Line(geometry, material);
        constellationRef.current.add(line);
        // We won't track individual lines in refs for simplicity
      }
    });
  }, [skillsData]);

  // Animation loop
  useFrame(({ clock }) => {
    if (!constellationRef.current) return;

    const elapsedTime = clock.getElapsedTime();

    // Slow rotation of the constellation
    constellationRef.current.rotation.y = elapsedTime * 0.05;
    constellationRef.current.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
    constellationRef.current.rotation.z = Math.sin(elapsedTime * 0.07) * 0.1;

    // Pulse the nodes
    nodeRefs.current.forEach((node, skillName) => {
      const skill = skillsData.find((s) => s.name === skillName);
      if (!skill) return;
      const pulse = Math.sin(elapsedTime * 1.5 + skill.proficiency * 5) * 0.1 + 1;
      node.scale.set(pulse, pulse, pulse);
      
      // Also pulse the emissive intensity for a breathing effect
      const material = node.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(elapsedTime * 2 + skill.proficiency * 3) * 0.2;
    });
  });

  return (
    <group ref={constellationRef}>
      <OrbitControls 
        enableZoom={true} 
        enablePan={false} 
        enableRotate={true}
        minDistance={2}
        maxDistance={5}
        dampingFactor={0.1}
        enableDamping={true}
      />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
    </group>
  );
}
