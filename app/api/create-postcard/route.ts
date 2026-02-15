import { NextRequest, NextResponse } from 'next/server';
import Lob from 'lob';

const lob = new Lob(process.env.LOB_TEST_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, message, to } = await request.json();

    if (!imageUrl || !message || !to) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create postcard using Lob API
    const postcard = await lob.postcards.create({
      description: 'Custom Travel Postcard',
      to: {
        name: to.name,
        address_line1: to.address_line1,
        address_city: to.address_city,
        address_state: to.address_state,
        address_zip: to.address_zip,
        address_country: 'US',
      },
      from: {
        name: 'Tales & Tiles',
        address_line1: '123 Test St', // TODO: Replace with actual return address
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94107',
        address_country: 'US',
      },
      front: imageUrl, // Front of postcard (your photo)
      back: `<html>
        <head>
          <style>
            body {
              font-family: 'Courier New', monospace;
              padding: 20px;
              font-size: 14px;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </body>
      </html>`, // Back of postcard (message)
      size: '6x4',
      mail_type: 'usps_first_class',
    });

    return NextResponse.json({
      success: true,
      postcard: {
        id: postcard.id,
        url: postcard.url,
        expected_delivery: postcard.expected_delivery_date,
      },
    });
  } catch (error: any) {
    console.error('Lob API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create postcard' },
      { status: 500 }
    );
  }
}
