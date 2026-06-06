import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectToDatabase from '@/lib/mongodb';
import Scene from '@/models/Scene';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const scene = await Scene.findOne({ userEmail: session.user.email });
    
    return NextResponse.json({ objects: scene?.objects || [] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching scene:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { objects } = await req.json();

    await connectToDatabase();
    
    // Update or create the scene for the user
    const scene = await Scene.findOneAndUpdate(
      { userEmail: session.user.email },
      { objects },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, objects: scene.objects }, { status: 200 });
  } catch (error) {
    console.error('Error saving scene:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
